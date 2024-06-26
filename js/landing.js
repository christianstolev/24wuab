
// Req: JQUERY
$(document).ready(function() {
    var containers = $('.container');

    if (containers.length) {
        containers.each(function() {
            var container = $(this);

            // Support small text - copy to fill screen width
            if (container.find('.scrolling-text').outerWidth() < $(window).width()) {
                var windowToScrolltextRatio = Math.round($(window).width() / container.find('.scrolling-text').outerWidth()),
                    scrollTextContent = container.find('.scrolling-text .scrolling-text-content').text(),
                    newScrollText = '';
                for (var i = 0; i < windowToScrolltextRatio; i++) {
                    newScrollText += ' ' + scrollTextContent;
                }
                container.find('.scrolling-text .scrolling-text-content').text(newScrollText);
            }

            // Init variables and config
            var scrollingText = container.find('.scrolling-text'),
                scrollingTextWidth = scrollingText.outerWidth(),
                scrollingTextHeight = scrollingText.outerHeight(true),
                startLetterIndent = parseInt(scrollingText.find('.scrolling-text-content').css('font-size'), 10) / 4.8,
                startLetterIndent = Math.round(startLetterIndent),
                scrollAmountBoundary = Math.abs($(window).width() - scrollingTextWidth),
                transformAmount = 0,
                leftBound = 0,
                rightBound = scrollAmountBoundary,
                transformDirection = container.hasClass('left-to-right') ? -1 : 1,
                transformSpeed = 100;

            // Read transform speed
            if (container.attr('speed')) {
                transformSpeed = container.attr('speed');
            }
        
            // Make scrolling text copy for scrolling infinity
            container.append(scrollingText.clone().addClass('scrolling-text-copy'));
            container.find('.scrolling-text').css({'position': 'absolute', 'left': 0});
            container.css('height', scrollingTextHeight);
        
            var getActiveScrollingText = function(direction) {
                var firstScrollingText = container.find('.scrolling-text:nth-child(1)');
                var secondScrollingText = container.find('.scrolling-text:nth-child(2)');
        
                var firstScrollingTextLeft = parseInt(container.find('.scrolling-text:nth-child(1)').css("left"), 10);
                var secondScrollingTextLeft = parseInt(container.find('.scrolling-text:nth-child(2)').css("left"), 10);
        
                if (direction === 'left') {
                    return firstScrollingTextLeft < secondScrollingTextLeft ? secondScrollingText : firstScrollingText;
                } else if (direction === 'right') {
                    return firstScrollingTextLeft > secondScrollingTextLeft ? secondScrollingText : firstScrollingText;
                }
            }
        
            $(window).on('wheel', function(e) {
                var delta = e.originalEvent.deltaY;
                
                if (delta > 0) {
                    // going down
                    transformAmount += transformSpeed * transformDirection;
                    container.find('.scrolling-text .scrolling-text-content').css('transform', 'skewX(10deg)');
                }
                else {
                    transformAmount -= transformSpeed * transformDirection;
                    container.find('.scrolling-text .scrolling-text-content').css('transform', 'skewX(-10deg)');
                }
                setTimeout(function(){
                    container.find('.scrolling-text').css('transform', 'translate3d('+ transformAmount * -1 +'px, 0, 0)');
                }, 10);
                setTimeout(function() {
                    container.find('.scrolling-text .scrolling-text-content').css('transform', 'skewX(0)');
                }, 500)
        
                // Boundaries
                if (transformAmount < leftBound) {
                    var activeText = getActiveScrollingText('left');
                    activeText.css({'left': Math.round(leftBound - scrollingTextWidth - startLetterIndent) + 'px'});
                    leftBound = parseInt(activeText.css("left"), 10);
                    rightBound = leftBound + scrollingTextWidth + scrollAmountBoundary + startLetterIndent;
        
                } else if (transformAmount > rightBound) {
                    var activeText = getActiveScrollingText('right');
                    activeText.css({'left': Math.round(rightBound + scrollingTextWidth - scrollAmountBoundary + startLetterIndent) + 'px'});
                    rightBound += scrollingTextWidth + startLetterIndent;
                    leftBound = rightBound - scrollingTextWidth - scrollAmountBoundary - startLetterIndent;
                }
            });
        })
    }
    
    /* Store the element in el */
    let els = document.getElementsByClassName('platform')
    for (let el of els) {
        const height = el.clientHeight
        const width = el.clientWidth

        /*
        * Add a listener for mousemove event
        * Which will trigger function 'handleMove'
        * On mousemove
        */
        el.addEventListener('mousemove', handleMove)

        /* Define function a */
        function handleMove(e) {
            el.parentElement.style.zIndex = 100
            /*
                * Get position of mouse cursor
                * With respect to the element
                * On mouseover
                */
            /* Store the x position */
            const xVal = e.layerX
            /* Store the y position */
            const yVal = e.layerY
            
            /*
                * Calculate rotation valuee along the Y-axis
                * Here the multiplier 20 is to
                * Control the rotation
                * You can change the value and see the results
                */
            const yRotation = -30 * ((xVal - width / 2) / width)
            
            /* Calculate the rotation along the X-axis */
            const xRotation = 30 * ((yVal - height / 2) / height)
            
            /* Generate string for CSS transform property */
            const string = 'perspective(500px) scale(1.2) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)'
            
            /* Apply the calculated transformation */
            el.style.transform = string
            el.style.background = "linear-gradient(" +((xVal - width / 2)) + "deg, #326dac90, transparent)"
        }

        /* Add listener for mouseout event, remove the rotation */
        el.addEventListener('mouseout', function() {
        el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
        el.parentElement.style.zIndex = 0
        el.style.background = "rgba(0, 0, 0, 0.025)"
        })

        /* Add listener for mousedown event, to simulate click */
        el.addEventListener('mousedown', function() {
        el.style.transform = 'perspective(500px) scale(0.9) rotateX(0) rotateY(0)'
        })

        /* Add listener for mouseup, simulate release of mouse click */
        el.addEventListener('mouseup', function() {
        el.style.transform = 'perspective(500px) scale(1.1) rotateX(0) rotateY(0)'
        })
    }
    /* Get the height and width of the element */
    
});


