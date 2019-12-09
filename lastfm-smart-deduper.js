(function() {                   // the whole script function

///---------- You can fine-tune the script here: ------------

const MODE = 1;                 // in which way to delete duplicates:
    // : 0 - silent mode (always uses forced deletion); use this mode only if you don't need 100% accuracy
    // : 1 - balanced mode (uses forced deletion in obvious cases, otherwise gives you a choice)
    // : 2 - absolutely safe mode (always gives you a choice)
const CACHE_MAX_SIZE = 4;       // if the positional distance is greater - not a duplicate
const MAX_DIFF_MINS = 15;       // if the time difference is greater (in minutes) - not a duplicate
const MIN_SCROBBLE_TIME_MINS = 1; // if the time difference between same songs is less (in minutes) - it's a duplicate
const SAME_NEIGHBOURS_ARE_ALWAYS_DUPLICATES = false;

///----------------------------------------------------------

const cache = [];
const DELETE_BUTTON_TEXT = 'Delete';

function createExtraDeleteButton(deleteFunc) {
    const btn = document.createElement('button');
    btn.innerText = DELETE_BUTTON_TEXT;
    btn.onclick = deleteFunc;
    btn.style.background = '#D92323'; // red
    btn.style.color = 'white';
    btn.style.padding = '5px';
    return btn;
}

function createCacheObj(songId, scrobbleDate, deleteBtn, row) {
    return { 
        songId: songId,
        date: scrobbleDate,
        isDuplicate: false, 
        isForcedDeleted: false,     // if a duplicate has been deleted silently
        isRemainedOriginal: false,  // the original for which a duplicate has been found
        extraDeleteButton: null,    // additional button for convenience -- when you have to make a decision
        get hasFinalState() { return this.isForcedDeleted || this.isRemainedOriginal; },
        deleteMe: function(forced) {
            this.isDuplicate = true;
            row.style.background = '#F2CDCF'; // light red

            if (MODE === 2 || MODE === 1 && !forced) { // giving a choice:
                const rowButtons = row.querySelectorAll('button');
                const lastButton = rowButtons[rowButtons.length - 1];

                if (lastButton.innerText !== DELETE_BUTTON_TEXT) { // if Delete button is not yet added
                    this.extraDeleteButton = createExtraDeleteButton(function() { 
                        deleteBtn.click(); 
                    });
                    row.appendChild(this.extraDeleteButton);
                }
            } else { // forced deletion:
                (function() { deleteBtn.click(); })();
                this.isForcedDeleted = true;

                if (this.extraDeleteButton != null) { 
                    row.removeChild(this.extraDeleteButton); 
                    this.extraDeleteButton = null;
                }
            }
        },
        forcedDeleteIfDuplicated: function() {
            if (this.isDuplicate && !this.isForcedDeleted) {
                this.deleteMe(true);
            }
        },
        remainMe: function() { 
            row.style.background = '#DDFFD9'; // light green
            this.isRemainedOriginal = true; 
        }
    };
}

function addToCache(cacheObj) {
    cache.push(cacheObj); 
    if (cache.length > CACHE_MAX_SIZE) {
        cache.shift();
    }
}

function processCache() {
    for (let i = 0; i < cache.length - 1; ++i) {
        const current = cache[i];

        for (let j = i + 1; j < cache.length; ++j) { // comparing current with all the rest elements in the cache:
            const laterOne = cache[j];

            if (current.hasFinalState && laterOne.hasFinalState) { continue; }

            const diffMins = Math.abs(laterOne.date - current.date)/1000/60; // time difference between the scrobbles (minutes)
            const isInsignificantTimeDiff = diffMins <= MIN_SCROBBLE_TIME_MINS;

            if (isInsignificantTimeDiff) {
                // if it was questionable before - it's time for forced deletion now (as datetime is duplicated):
                current.forcedDeleteIfDuplicated();
                laterOne.forcedDeleteIfDuplicated();
            }
            
            const sameSongs = current.songId === laterOne.songId;
            const areNeighbours = j === i + 1;
            const shortTimeAgo = diffMins <= MAX_DIFF_MINS;

            if (sameSongs && (shortTimeAgo || areNeighbours && SAME_NEIGHBOURS_ARE_ALWAYS_DUPLICATES)) {
                // duplicate found!
                if (!laterOne.isForcedDeleted && (!laterOne.isDuplicate || isInsignificantTimeDiff)) {
                    laterOne.deleteMe(isInsignificantTimeDiff);
                }
                if (!current.isRemainedOriginal && !current.isDuplicate) { current.remainMe(); }
            }
        }
    }
}

///---------- Script logic: ------------

const chartRows = document.querySelectorAll('.chartlist-row'); // scrobbles rows

for (let i = chartRows.length - 1; i >= 0; --i) { // from earlier to later
    const row = chartRows[i];

    const songName = row.querySelector('.chartlist-name').querySelector('a').innerText;
    const artistName = row.querySelector('.chartlist-artist').querySelector('a').innerText;
    const songId = songName + ' - ' + artistName;

    const scrobbleDateTitle = row.querySelector('.chartlist-timestamp').querySelector('span').getAttribute('title');
    const scrobbleDate = new Date(scrobbleDateTitle.replace('pm', ' pm').replace('am', ' am'));

    const deleteBtn = row.querySelector('.more-item--delete');

    const cacheObj = createCacheObj(songId, scrobbleDate, deleteBtn, row);
    addToCache(cacheObj);
    
    if (cache.length === CACHE_MAX_SIZE || i === 0) { // to work with full cache
        processCache();
    }
}

})(); // the end
