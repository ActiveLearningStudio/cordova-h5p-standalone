var H5P = H5P || {};

H5P.PhetInteractiveSimulation = (function($) {
    
    function PhetInteractiveSimulation(options, id) {
        var self = this;
        this.id = id;
        this.options = options;
        self.on('resize', function () {
            if (this.container) {
                let width = H5P.jQuery(this.container).width();
                let height = width * (9/16);
                let phetiframe = $('.phetiframe', this.container);
                $(phetiframe).width(width);
                $(phetiframe).height(height);
            }
        });
    }

    PhetInteractiveSimulation.prototype.attach = function($container) {
        this.container = $container;
        if (!Object.keys(this.options).find(field => field === 'phetSimulationFile' || field === 'phetSimulationUrl')) {
            $container.append('<h3><strong>No simulation configured.</strong></h3>');
        } else if (this.options.phetSimulationSource === 'url' && this.options.phetSimulationUrl) {
            $container.append('<iframe class="phetiframe" src="' + this.options.phetSimulationUrl + '"></iframe>');
            this.trigger('resize');
        } else if (this.options.phetSimulationSource === 'file' && this.options.phetSimulationFile) {            
            let hasAbsoluteUrl = H5PIntegration.url.split('/').find(x => x === 'https:' || x === 'http:');
            var url = (hasAbsoluteUrl ? H5PIntegration.url : H5PIntegration.baseUrl + '/' + H5PIntegration.url) + "/content/" + this.id + "/" + this.options.phetSimulationFile.path;
            $container.append('<iframe class="phetiframe" src="' + url + '"></iframe>');
            this.trigger('resize');
        }
    }

    return PhetInteractiveSimulation;

})(H5P.jQuery);