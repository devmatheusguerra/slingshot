class Objeto {
    constructor({ width, height, velocidade }) {
        this.width = width;
        this.height = height;
        this.object = document.createElement('div');
        this.object.style.position = 'absolute';

        // Create a Keyframe
        const css = document.createElement('style');
        css.innerHTML = `
        @keyframes rotate { 
            from { transform: rotate(0deg); } 
            to { transform: rotate(360deg); } 
        }
        
        .rotate {
            transition: all .01s linear;
            animation: rotate ${velocidade != undefined ? 25 / velocidade  : 25/10}s linear infinite;
        }
        `;

        // Add the Keyframe to the page
        document.head.appendChild(css);
    }

    setImage(path) {
        this.object.style.backgroundImage = 'url(' + path + ')';
        this.object.style.backgroundSize = 'cover';
        this.object.style.backgroundRepeat = 'no-repeat';
        this.object.style.backgroundPosition = 'center';
    }

    setBall({color}) {
        this.object.style.borderRadius = '100%';
        this.width = this.height;
        this.object.style.backgroundColor = (color != undefined) ? color : '#000';
    }

    rotate()
    {
        this.object.classList.add('rotate');
    }

    stopRotate()
    {
        this.object.classList.remove('rotate');
    }

    setPosition({x, y})
    {
        if(x != undefined)
            this.object.style.left = x + 'px';
        if(y != undefined)
            this.object.style.bottom = y + 'px';
    }

    render()
    {
        this.object.style.width = this.width + 'px';
        this.object.style.height = this.height + 'px';
        document.body.appendChild(this.object);
    }
}


