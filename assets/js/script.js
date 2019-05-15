/* === Model === */
var model = {
    currentCat: null,
    cats: [{
            clickCount: 0,
            name: 'Bob',
            imgSrc: 'assets/img/bob.jpg',
            imgAttribution: 'normal cat'
        },
        {
            clickCount: 0,
            name: 'Bruce',
            imgSrc: 'assets/img/bruce.jpg',
            imgAttribution: 'crazy cat'
        },
        {
            clickCount: 0,
            name: 'Hungry',
            imgSrc: 'assets/img/hungry.jpg',
            imgAttribution: 'hungry cat'
        },
        {
            clickCount: 0,
            name: 'Kyra',
            imgSrc: 'assets/img/kyra.jpg',
            imgAttribution: 'cute cat'
        },
        {
            clickCount: 0,
            name: 'Scarlet',
            imgSrc: 'assets/img/scarlet.jpg',
            imgAttribution: 'beautiful'
        }
    ]
};


/* === Octopus === */
var octopus = {
    init: function () {
        console.log("octopus init")
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];
        // tell our views to initialize
        catListView.init();
        catView.init();
        adminView.init();
    },
    getCurrentCat: function () {
        return model.currentCat;
    },
    getCats: function () {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function (cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function () {
        model.currentCat.clickCount++;
        catView.render();
    },

    adminSave: function (formName, formImg, formClick) {
        for (var i = 0; i < model.cats.length; i++) {
            if (model.cats[i].name == formName) {
                model.cats[i].name = formName;
                model.cats[i].imgSrc = formImg;
                model.cats[i].clickCount = formClick;
            }
        }
        catView.render();
    },
    adminVisualize: function () {
        this.cat = octopus.getCurrentCat();
        document.getElementById('name').value = this.cat.name
        document.getElementById('imgurl').value = this.cat.imgSrc
        document.getElementById('clicks').value = this.cat.clickCount

        adminView.render()
    },
    adminHide: function () {
        adminView.notRender()
    }

};

/* === View's === */
var adminView = {
    init: function () {
        /* Init Variables */
        this.adminViewer = document.getElementById('admin-view')
        this.adminArea = document.getElementById('admin-area')
        this.adminSave = document.getElementById('admin-save')
        this.adminCancel = document.getElementById('admin-cancel')
   
        /* Event Listeners */
        this.adminArea.addEventListener('click', function (e) {
            octopus.adminVisualize();
        })
        this.adminCancel.addEventListener('click', function (e) {
            octopus.adminHide();
        })
        this.adminSave.addEventListener('click', function (e) {
            let formName = document.getElementById("name").value;
            let formImg = document.getElementById("imgurl").value;
            let formClick = document.getElementById("clicks").value;
            octopus.adminSave(formName, formImg, formClick);
            octopus.adminHide();
        })
    },
    render: function () {
        this.adminViewer.style.display = 'block';

    },
    notRender: function () {
        this.adminViewer.style.display = 'none';
    }


}
var catView = {
    init: function () {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function (e) {
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right)
        this.render();
    },
    render: function () {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
        document.getElementById('name').value = currentCat.name
        document.getElementById('imgurl').value = currentCat.imgSrc
        document.getElementById('clicks').value = currentCat.clickCount
    }
}

var catListView = {

    init: function () {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list')

        // render this view (update the DOM elements with the right values)
        this.render()
    },

    render: function () {
        var cat, elem, i;
        // get the cats weell be rendering from the octopus
        var cats = octopus.getCats()

        // empty the cat list
        this.catListElem.innerHTML = ''

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we re currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li')
            elem.textContent = cat.name

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            // of the car variable to the click event function)
            elem.addEventListener('click', (function (catCopy) {
                return function () {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            // finally, add the elemnt to the list
            this.catListElem.appendChild(elem)
        }
    }
}

// make it go
octopus.init()