function Mouse()
{
    this.LEFT = 0;
    this.MIDDLE = 1;
    this.RIGHT = 2;

    this.buttonDown = {}

    this.xPos = 0;
    this.yPos = 0;

    this.Initialise = function(canvas)
    {
        var self = this;
        var context = canvas.getContext('2d');

        canvas.addEventListener('mousemove', function(evt)
        {
            var rect = canvas.getBoundingClientRect();
            self.xPos = evt.x - rect.left;
            self.yPos = evt.y - rect.top;
        });
        canvas.addEventListener('mousedown', function(evt)
        {
            self.buttonDown[evt.button] = true;
        });
        canvas.addEventListener('mouseup', function(evt)
        {
            self.buttonDown[evt.button] = false;
        });
    }

    this.GetX = function()
    {
        return this.xPos;
    }
    this.GetY = function()
    {
        return this.yPos;
    }
    this.isButtonPressed = function(button)
    {
        //console.log(this.buttonDown[button])
        return this.buttonDown[button];
    }

}

var mouse = new Mouse();