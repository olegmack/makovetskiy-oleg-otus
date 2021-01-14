let object = {
    "name": 1,
    "items": [
        {
            "name": 2,
            "items": [
                { "name": 3 }, 
                { "name": 4 }
            ]
        }, 
        {
            "name": 5,
            "items": [{ "name": 6 }]
        }
    ]
};

/**
 * Render object as tree
 * 
 * @param Object obj 
 * @param string itemPrefix 
 * @param string levelPrefix 
 */
function renderTree(obj, itemPrefix = '', levelPrefix = '') {
    console.log(itemPrefix + obj.name);

    //child items rendering
    if (obj.items != undefined) {
        for (let i = 0; i < obj.items.length; i++) {            
            if (i < obj.items.length - 1) {
                subitemPrefix = "\u251C--";
                sublevelPrefix = levelPrefix + "|   ";
            } else {
                //last item
                subitemPrefix = "\u2514--";
                sublevelPrefix = levelPrefix + "   ";
            }

            renderTree(obj.items[i], levelPrefix + subitemPrefix, sublevelPrefix);
        }
    }
}

renderTree(object);