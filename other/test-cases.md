### Some specific cases for white-box testing

song | time | action
----- | ----- | ------
a | 10:00 | remain
a | 10:00 | del!
a | 10:00 | del!

song | time | action
----- | ----- | ------
a | 09:55 | remain
a | 09:55 | del!
a | 10:00 | del?

song | time | action
----- | ----- | ------
a | 09:55 |
b | 09:55 | remain
b | 10:00 | del?

song | time | action
----- | ----- | ------
a | 10:00 | remain
b | 10:00 |
a | 10:00 | del!

song | time | action
----- | ----- | ------
a | 09:51 | remain
b | 09:55 |
a | 10:00 | del?

song | time | action
----- | ----- | ------
a | 09:55 | remain
b | 10:00 | 
a | 10:00 | del!

song | time | action
----- | ----- | ------
a | 09:55 | remain
a | 10:00 | del!
b | 10:00 |

song | time | action
----- | ----- | ------
a | 09:55 | remain
a | 10:00 | del?
b | 10:05 |
