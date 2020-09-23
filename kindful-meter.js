(function () {

    function run() {
        /**
     * Capture settings from element data. Set defaults.
     */
        const container = document.getElementById('kindful-meter');
        const url = container.getAttribute('data-kindful-url');
        const color = container.getAttribute('data-color') || '35, 207, 130';
        const height = container.getAttribute('data-height') || 300;
        const width = container.getAttribute('data-width') || 60;

        /**
         * Take fundraising data and builds an HTML/CSS dsplay meter for it.
         * Fairly long as it contains all of the markup.
         * 
         * @param {Object} data - A Kindful data object.
         */
        function renderWidget(data) {
            let campaign = data && data.campaign;

            if (!campaign) {
                return;
            }

            let name = campaign.name;
            let goal = campaign.goal_amount_in_cents / 100;
            let raised = campaign.total_raised_amount_in_cents / 100;
            let meter = {
                height: height,
                width: width,
                color: color,
                segments: 18
            };
            let raisedPx = meter.height / goal * raised;

            // Meter
            css(container, {
                'display': 'inline-block',
                'text-align': 'center'
            });

            // Goal heading
            let goalText = document.createElement('div');
            addClass(goalText, 'sv-kindful-meter-goal');
            goalText.innerHTML = 'Goal: $' + numberWithCommas(goal);
            css(goalText, {
                'font-size': '24px',
                'font-weight': '500'
            });
            container.appendChild(goalText);

            // Meter background
            let meterBg = document.createElement('div');
            addClass(meterBg, 'sv-kindful-meter-bg');
            css(meterBg, {
                'background': '#fff',
                'border': '2px solid #555',
                'border-radius': meter.width / 2 + 'px',
                'box-shadow': '0px 4px 10px rgba(0, 0, 0, 0.4)',
                'display': 'flex',
                'flex-direction': 'column',
                'height': meter.height + 'px',
                'margin': '15px auto',
                'overflow': 'hidden',
                'position': 'relative',
                'width': meter.width + 'px'
            });
            container.appendChild(meterBg);

            // Raised heading
            let raisedText = document.createElement('div');
            addClass(raisedText, 'sv-kindful-meter-raised');
            raisedText.innerHTML = '$' + numberWithCommas(raised);
            css(raisedText, {
                'bottom': meter.height / 2 + 'px',
                'font-size': '32px',
                'font-weight': '600',
                'left': '50%',
                'position': 'absolute',
                'transform-origin': 'center',
                'transform': 'translateX(-50%) translateY(50%) rotate(90deg)'
            });
            meterBg.appendChild(raisedText);

            // Meter foreground
            let meterFg = document.createElement('div');
            addClass(meterFg, 'sv-kindful-meter-fg');
            css(meterFg, {
                'background': 'rgb(' + meter.color + ')',
                'background': 'linear-gradient(90deg, rgba(' + meter.color + ', 1) 0%, rgba(' + meter.color + ', 0.6) 100%)',
                'bottom': '0',
                'height': raisedPx + 'px',
                'left': '0',
                'overflow': 'hidden',
                'position': 'absolute',
                'width': '100%',
                'z-index': '1'
            });
            meterBg.appendChild(meterFg);

            // Segments
            let segment = null;
            for (let i = 0; i < meter.segments; i++) {
                segment = document.createElement('div');
                addClass(segment, 'sv-kindful-meter-segment');
                css(segment, {
                    'border-bottom': '1px solid rgba(214, 214, 214, 0.3)',
                    'flex': '1',
                    'width': '100%',
                    'z-index': '2'
                });
                meterBg.appendChild(segment);
            }

            // Raised heading foreground
            let raisedTextFg = document.createElement('div');
            addClass(raisedTextFg, 'sv-kindful-meter-raised-fg');
            raisedTextFg.innerHTML = '$' + numberWithCommas(raised);
            css(raisedTextFg, {
                'bottom': meter.height / 2 + 'px',
                'color': '#fff',
                'font-size': '32px',
                'font-weight': '600',
                'left': '50%',
                'position': 'absolute',
                'text-shadow': '0 0 1px rgba(0,0,0,0.6)',
                'transform-origin': 'center',
                'transform': 'translateX(-50%) translateY(50%) rotate(90deg)'
            });
            meterFg.appendChild(raisedTextFg);

            // Campaign Name
            let nameText = document.createElement('div');
            addClass(nameText, 'sv-kindful-meter-name');
            nameText.innerHTML = name;
            css(nameText, {
                'font-size': '21px',
                'font-weight': '500'
            });
            container.appendChild(nameText);
        }

        /**
         * Fetch data.
         */
        function getCORS(success) {
            var xhr = new XMLHttpRequest();
            if (!('withCredentials' in xhr)) xhr = new XDomainRequest(); // fix IE8/9
            xhr.open('GET', url);
            xhr.onload = success;
            xhr.send();
            return xhr;
        }

        /**
         * Handle fetching of data.
         */
        function onGetCORS(event) {
            let currentTarget = event && event.currentTarget;
            let data = currentTarget.response || event.target.responseText;
            data = data && JSON.parse(data);

            if (currentTarget.status === 200 && data) {
                renderWidget(data);
            } else {
                console.log('Had trouble getting Kindful data. ', event, data);
            }
        }

        /**
         * Helper function.
         * Add a class to element.
         */
        function addClass(el, className) {
            if (el.classList) el.classList.add(className);
            else if (!hasClass(el, className)) el.className += ' ' + className;
        }

        /**
         * Helper function.
         * Add multiple styles as an object to an elmeent.
         */
        function css(el, styles) {
            for (var property in styles)
                el.style[property] = styles[property];
        }

        /**
         * Helper function.
         * Add commas to a number for display.
         */
        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            // return x.toFixed(2);
        }

        getCORS(onGetCORS);
    }

    // in case the document is already rendered
    if (document.readyState != 'loading') run();
    // modern browsers
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', run);
    // IE <= 8
    else document.attachEvent('onreadystatechange', function () {
        if (document.readyState == 'complete') run();
    });
})();