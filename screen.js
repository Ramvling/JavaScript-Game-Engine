function Box(x,y,width,height) {
    var box = {x:x, y:y, width:width, height:height};

    box.center = {x:(x+width/2), y:(y+height/2)};

    box.isColliding = function(other) {
           if ( (box.x < other.x + other.width) && 
                (box.x + box.width > other.x) && 
                (box.y < other.y + other.height) && 
                (box.y + box.height > other.y))  {
                return true;
            } 
            return false;
    }

     return box;
}

function Node(data, root, box) {
    return {data:data, root:root, box:box};
}

function BVH( screenWidth, screenHeight) {
    //collission data structure
    var bvh = {};
    bvh.size = 1;

    bvh.findMinAndMax = function (input) {
        var m = {minx:9999999,miny:999999999, maxx:-999999, maxy:-999999};

        for (i = 0; i < input.length; i++) {
            test = input[i];
            if (test.x < m.minx) {
                m.minx = test.x;
            }
            if (test.y < m.miny) {
                m.miny = test.y;
            }

            if (test.x + test.width > m.maxx) {
                m.maxx = test.x + test.width;
            }

            if (test.y + test.height > m.maxy) {
                m.maxy = test.y + test.height;
            }
        }
        return m;
    }

    bvh.generateTree = function(screenWidth, screenHeight) {

        //hardcoded entity list
        entityList = [Entity(100,100), Entity(100,300), Entity(300,100), Entity(300,400), Entity(100,500), Entity(500,100), Entity(200,50), Entity(200,600)];
        bvh.entityList = entityList; 
        entityList.sort(function(a,b) {
            //sorts by distance
            dist = Math.pow(a.x - b.x,2) + Math.pow(a.y - b.y,2);
            dist = Math.pow(dist,0.5);
            return dist;
        });

        bvh.root = Node(entityList, null, Box(0,0,screenWidth, screenHeight));
        //bvh.partition(entityList); 
        bvh.partition(bvh.root);
    }

    //takes in a node and returns a nod
    //So this clearly is only sort of working. Going to try a bottom up method now.
    bvh.partition = function(node) {
        if (node.data.length == 0) {
            return null;
        }
        if (node.data.length == 1) {
            data = node.data[0];
            leafNode = {};
            leafNode.data = data;
            leafNode.box = Box(data.x,data.y,data.width, data.height);
            leafNode.root = node;
            leafNode.left = null;
            leafNode.right = null;
            console.log(data);
            console.log("bloop");
            return leafNode;
        }

        slicePoint = Math.round(node.data.length / 2);
        firstHalf = node.data.slice(0,slicePoint);
        secondHalf = node.data.slice(slicePoint, node.data.length);
        console.log(firstHalf);
        console.log(secondHalf);
        //create boxes
        m1 = bvh.findMinAndMax(firstHalf);
        m2 = bvh.findMinAndMax(secondHalf);
        console.log(m1);
        console.log(m2);
        firstBox = Box(m1.minx,m1.miny,(m1.maxx - m1.minx), (m1.maxy - m1.miny));
        secondBox = Box(m2.minx,m2.miny,(m2.maxx - m2.minx), (m2.maxy - m2.miny));

        firstNode = Node(firstHalf, node, firstBox);
        secondNode = Node(secondHalf, node, secondBox);
        console.log("First half node");
        console.log(firstNode);
        console.log("SecondHalf node");
        console.log(secondNode); 
        node.left = bvh.partition(firstNode);
        node.right = bvh.partition(secondNode);
        return node;
    }

/*
    bvh.partition = function(entityList) {
        //turn all entities into nodes
        currentLayer = [];
        root = null;
        for (i = 0; i < entityList.length; i++) {
            cur = entityList[i];
            newNode = Node(cur, null, cur.box);
            currentLayer.push(newNode);
        }
        console.log(currentLayer);

        nextLayer = [];
        while ((currentLayer.length > 0) ||  (nextLayer.length > 0)) {
            console.log(currentLayer);
            console.log(nextLayer);
            if (currentLayer.length == 0) {
                if (nextLayer.length == 1) {
                    break;
                }
                console.log("next layer being grabbed");
                currentLayer = [];
                currentLayer = nextLayer;
                nextLayer = [];
            }        
            //pair off nearest boxes and remove from layer list
            curNode = currentLayer.shift();
            console.log(curNode);
            if (currentLayer.length > 0) {
                nearestIndex = bvh.findNearest(curNode.box.center, currentLayer);
                console.log(currentLayer);
                nearestNode = currentLayer[nearestIndex];
                console.log(nearestNode);
                currentLayer.splice(nearestIndex,1);
                //create parent node
                d = bvh.findMinAndMax(curNode.box, nearestNode.box); 
                parentBox = Box(d.minx,d.miny,(d.maxx - d.minx), (d.maxy - d.miny));
                parentNode = Node(null, null, parentBox);
                //probably should check left and right. Not sure it matters though
                parentNode.left = curNode;
                parentNode.right = nearestNode;
                curNode.root = parentNode;
                nearestNode.root = parentNode;
            } else {
               parentNode = Node(null,null, curNode.box);
               parentNode.left = curNode;
            }
            root = parentNode;
            nextLayer.push(parentNode);
        }

        return root;
    }*/

    bvh.findNearest = function(box, layer) {
        nearest = null;
        minDis = 99999999999;
        for (i = 0; i < layer.length; i++) {
                centroid = layer[i].box;
                distance = Math.pow((box.x - centroid.x), 2) + Math.pow((box.y - centroid.y), 2);
                distance = Math.pow(distance, 0.5);
                if (distance < minDis) {
                    nearest = i;
                    minDis = distance;
                }
        }
        return nearest;
    }

    bvh.drawTree = function(context, current, color) {
       if (current == null) {
            return;
        }
         //traverse tree
        layerColor = Color(color.r,color.g,color.b);
        context.fillStyle = layerColor;
        box = current.box;
        context.fillRect(box.x,box.y,box.width,box.height);
        color.r += 5;
        console.log(current.box);
        bvh.drawTree(context,current.left,color);
        color.r -= 5;
        color.b +=5;
        bvh.drawTree(context,current.right, color);
  //      context.fill();

    }

        console.log(bvh);
    return bvh;
}


function World() {
    //setup world options here. For now hard coded. Shouldn't actually do anything other than hold
    //stuff for screen to draw.
    var world = {};
    world.width = 3000;
    world.height = 1000;
    world.entities = [Entity(100,200)];
    world.obstacles = [];
    return world;
}

function Screen(screenWidth, screenHeight, context) {
    var screen = {};
    screen.bvh = BVH(screenWidth, screenHeight);
    screen.bvh.generateTree(screenWidth, screenHeight);
    screen.world = World();
    screen.width = screenWidth;
    screen.height = screenHeight;
    screen.onScreen = [];
    screen.context = context;
    screen.findItemsOnScreen = function() {
        //loop through all entities in world to find ones currently being rendered
        //Not sure if there is a better way to do this. Ask preston and nathan?
        e = screen.world.entities;
        for (i = 0; i < e.length; i++) {
            if ( (0 < e[i].x + e[i].width) && 
                (0 + screen.width > e[i].x) && 
                (0 < e[i].y + e[i].height) && 
                (0 + screen.height > e[i].y)) {
               screen.onScreen.push(e[i]); 
            }
        }
    }

    screen.render = function() {
        //refresh background.
        //screen.context.fillStyle = 'blue';
        //screen.context.rect(0,0,screen.width, screen.height);
        //screen.context.fill();
        //screen.findItemsOnScreen();
        //onScreen = screen.onScreen;
        //for (i = 0; i < onScreen.length; i++) {
          //  onScreen[i].draw(screen.context);
       // }
        screen.bvh.drawTree(screen.context, screen.bvh.root, {r:0,g:0,b:0});
        for (i = 0; i < screen.bvh.entityList.length; i++) {
            box = screen.bvh.entityList[i];
            screen.context.fillStyle = 'white';
            screen.context.fillRect(box.x,box.y,5,5);
        }       
    }

    return screen;
}
