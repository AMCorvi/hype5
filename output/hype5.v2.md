# Hype5

**Overview:** Data resource module enabling the user have automated access to the very latest and most popular music in the internet * globally

Exported module object



* * *

### Hype5.top(type, sig)

Method retrieves track info for overall "top" rated songs

**Parameters**

**type**: `string`, The category name of track info desired ( popular || instance )

**sig**: `object`, signature object used for test via dependency injections

**Returns**: `object`, object containing track info of specified type and filter


### Hype5.remixes(type, sig)

Method retrieves track info for "remixed" songs

**Parameters**

**type**: `string`, The category name of track info desired ( popular || instance )

**sig**: `object`, signature object used for test via dependency injections

**Returns**: `object`, object containing track info of specified type and filter


### Hype5.noremixes(type, sig)

Method retrieves track info for song that are not "remixes"

**Parameters**

**type**: `string`, The category name of track info desired ( popular || instance )

**sig**: `object`, signature object used for test via dependency injections

**Returns**: `object`, object containing track info as specified above



* * *



**Author:** AMCorvi

**License:** MIT



