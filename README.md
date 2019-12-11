![Last.fm Smart Deduper](https://repository-images.githubusercontent.com/226846544/220b3880-1acd-11ea-9894-d310454be9ae)

This script allows you to remove duplicates from your [Last.fm](https://www.last.fm/) scrobbles library. Why is this tool better than other similar ones?  Because it's *smart*: it can handle not only the situation when the same song was scrobbled multiple times in a row but also more complicated cases e.g. when duplicates were added a bit later (it's a common situation if you're using Spotify and Last.fm and have mistakenly set up scrobbling on both sides. Also, it has 3 modes: from absolutely safe (allowing you to make all the choices by yourself) to independent silent mode.

## How To Use
* Log into your Last.fm account and go to your `Scrobbles Library` (`https://www.last.fm/user/%USERNAME%/library`)
* Go to the page with duplicated scrobbles you want to remove
* Copy-paste the [script](https://github.com/shevchenkoartem/lastfm-smart-deduper/blob/master/other/compressed-js/compressed-mode1-balanced.js) (use mouse triple-click to select all the line) into the browser's console (`F12` for Chrome) and press `Enter` to run it
* Some duplicates will be deleted automatically (just trust the script!), some of them will be given to you for making the right decision—to delete or not to delete (that is the question ©). Anyway, all the duplicates will be marked by an appropriate color.
* Press Delete button displayed near the scrobbles you want to delete (don't press the button if you do not).
* Refresh the page. Voilà! Duplicates have been disappeared! :+1:
* Run the script again if needed (just press `Up` and `Enter` in the console to run the script once again).
* Go to the next problematic page and do the same.

## Script modes

You can run the script using 3 different modes depending on how accurate results you want to get or how much time you're ready to spend.

MODE code | Name | Accuracy | How it works
-- | -- | -- | --
0 | [silent](https://github.com/shevchenkoartem/lastfm-smart-deduper/blob/master/other/compressed-js/compressed-mode0-silent.js) | >95% | All the found duplicates (even questionable) will be deleted immediately. Use this mode only if you want to go the easiest way of deduplication and you don't need very high accuracy. | 
1 | [**balanced***](https://github.com/shevchenkoartem/lastfm-smart-deduper/blob/master/other/compressed-js/compressed-mode1-balanced.js) | >99% | The duplicates which obviously are duplicates will be deleted immediately. All the questionable cases will be marked with the Delete button so that you can make the right decision.
2 | [safe](https://github.com/shevchenkoartem/lastfm-smart-deduper/blob/master/other/compressed-js/compressed-mode2-safe.js) | 100% | For the most watchful :eyes: users—you'll always be given a choice. If you have enough time and strong nerves, use it.

\* *recommended*

## Create a bookmark for your convenience

Bookmarking is much more convenient than using a console so it worth creating a bookmark once you've choosen the most suitable mode for you.

* Right-click your browser's `Bookmarks Bar` and choose `Add Page...`
* Name the bookmark (e.g. "Last.fm Dedupe")
* Paste the choosen script you want to use into the `URL` field (make sure it begins with `javascript:`).
* Click `Save`

## Advices

* Zoom out the page so that you can see more scrobbles on a screen.
* Start running the script from the last problem page (e.g. 5th) and move page by page to the 1st one.
* After you've finished, do the same procedure once again to catch some rare cases when duplicates were on different pages or between them were too many other duplicates which prevented identifying the problem from the first time.
* When using balanced or safe mode and it's hard to make the right decision, remember about *GDBN (Good Die in a Bad Neighborhood)* rule (it's used in [chip manufacuring](http://yieldwerx.com/pat-gdbn-outlier-detection-moving-beyond-automotive/))—based on the premise that defects tend to cluster (sometimes it's better to remove even a good die that is surrounded by a cluster of failing dice). So if you have a page with a lot of duplicates but some one is questionable—most likely, it is also a duplicate.

## Fine-tuning (advanced)

The script has a few parameters which define its behavior. You can fine-tune it by changing the following constants at the beginning of the [script](https://github.com/shevchenkoartem/lastfm-smart-deduper/blob/master/lastfm-smart-deduper.js):

Parameter name | Default value | Meaning
-- | -- | --
MODE | 1 | Read [Script modes](https://github.com/shevchenkoartem/lastfm-smart-deduper#script-modes) section
CACHE_MAX_SIZE | 4 | If the positional distance (including) between two scrobbles is greater they will not be considered as duplicates. Set it to 2 if you want to clean-up only neighboring duplicates (this way the script would work like the other ones you can find on the Internet)
MAX_DIFF_MINS | 15 | If the time difference (in minutes) between two scrobbles is greater they will not be considered as duplicates. Try to analyze your cases and set this parameter appropriately.
MIN_SCROBBLE_TIME_MINS | 1 | If the time difference (in minutes) between the same songs is less they will be unquestionably considered as duplicates. If you're a grindcore (as well as other genres with a lot of "micro songs") lover, it's recommended to set it to 0.
SAME_NEIGHBOURS_ARE_ALWAYS_DUPLICATES | FALSE | The script is smart enough to distinguish the cases when you were playing some song repeatedly (such duplicates are treated as questionable). Set it to TRUE if you want such duplicates to be always treated as true duplicates (this way the script would work like the other ones you can find on the Internet).
