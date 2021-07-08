/**
 * @fileoverview added by tsickle
 * Generated from: lib/pinch-on-mobile-support.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PinchOnMobileSupport = /** @class */ (function () {
    function PinchOnMobileSupport(_zone) {
        this._zone = _zone;
        this.startX = 0;
        this.startY = 0;
        this.initialPinchDistance = 0;
        this.pinchScale = 1;
        if (this.isMobile()) {
            this.initializePinchZoom();
        }
    }
    /**
     * @private
     * @return {?}
     */
    PinchOnMobileSupport.prototype.isMobile = /**
     * @private
     * @return {?}
     */
    function () {
        return 'ontouchstart' in document.documentElement;
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    PinchOnMobileSupport.prototype.onViewerTouchStart = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.initialPinchDistance = 0;
        if (event.touches.length === 2) {
            /** @type {?} */
            var rect = this.container.getBoundingClientRect();
            // + this.container.scrollTop
            if (event.touches[0].pageX >= rect.left && event.touches[0].pageX <= rect.right) {
                if (event.touches[0].pageY >= rect.top /* && event.touches[0].pageY <= rect.bottom */) {
                    if (event.touches[1].pageX >= rect.left && event.touches[1].pageX <= rect.right) {
                        if (event.touches[1].pageY >= rect.top /* && event.touches[1].pageY <= rect.bottom  */) {
                            this.startX = (event.touches[0].pageX + event.touches[1].pageX) / 2;
                            this.startY = (event.touches[0].pageY + event.touches[1].pageY) / 2;
                            this.initialPinchDistance = Math.hypot(event.touches[1].pageX - event.touches[0].pageX, event.touches[1].pageY - event.touches[0].pageY);
                            event.preventDefault();
                            event.stopPropagation();
                        }
                    }
                }
            }
        }
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    PinchOnMobileSupport.prototype.onViewerTouchMove = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var PDFViewerApplicationOptions = ((/** @type {?} */ (window))).PDFViewerApplicationOptions;
        if (this.initialPinchDistance <= 0 || event.touches.length !== 2) {
            return;
        }
        if (this.pinchScale !== 1) {
            event.preventDefault();
        }
        /** @type {?} */
        var pinchDistance = Math.hypot(event.touches[1].pageX - event.touches[0].pageX, event.touches[1].pageY - event.touches[0].pageY);
        /** @type {?} */
        var originX = this.startX + this.container.scrollLeft;
        /** @type {?} */
        var originY = this.startY + this.container.scrollTop;
        this.pinchScale = pinchDistance / this.initialPinchDistance;
        /** @type {?} */
        var minZoom = Number(PDFViewerApplicationOptions.get('minZoom'));
        if (!minZoom) {
            minZoom = 0.1;
        }
        if (this.pinchScale < minZoom) {
            this.pinchScale = minZoom;
        }
        /** @type {?} */
        var maxZoom = Number(PDFViewerApplicationOptions.get('maxZoom'));
        if (!maxZoom) {
            maxZoom = 10;
        }
        if (this.pinchScale > maxZoom) {
            this.pinchScale = maxZoom;
        }
        this.viewer.style.transform = "scale(" + this.pinchScale + ")";
        this.viewer.style.transformOrigin = originX + "px " + originY + "px";
        event.preventDefault();
        event.stopPropagation();
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    PinchOnMobileSupport.prototype.onViewerTouchEnd = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var PDFViewerApplication = ((/** @type {?} */ (window))).PDFViewerApplication;
        if (this.initialPinchDistance <= 0) {
            return;
        }
        this.viewer.style.transform = "none";
        this.viewer.style.transformOrigin = "unset";
        PDFViewerApplication.pdfViewer.currentScale *= this.pinchScale;
        /** @type {?} */
        var rect = this.container.getBoundingClientRect();
        /** @type {?} */
        var dx = this.startX - rect.left;
        /** @type {?} */
        var dy = this.startY - rect.top;
        this.container.scrollLeft += dx * (this.pinchScale - 1);
        this.container.scrollTop += dy * (this.pinchScale - 1);
        this.resetPinchZoomParams();
        event.preventDefault();
        event.stopPropagation();
    };
    /**
     * @private
     * @return {?}
     */
    PinchOnMobileSupport.prototype.resetPinchZoomParams = /**
     * @private
     * @return {?}
     */
    function () {
        this.startX = this.startY = this.initialPinchDistance = 0;
        this.pinchScale = 1;
    };
    /**
     * @return {?}
     */
    PinchOnMobileSupport.prototype.initializePinchZoom = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.viewer = document.getElementById('viewer');
        this.container = (/** @type {?} */ (document.getElementById('viewerContainer')));
        this._zone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            document.addEventListener('touchstart', _this.onViewerTouchStart.bind(_this));
            document.addEventListener('touchmove', _this.onViewerTouchMove.bind(_this), { passive: false });
            document.addEventListener('touchend', _this.onViewerTouchEnd.bind(_this));
        }));
    };
    /**
     * @return {?}
     */
    PinchOnMobileSupport.prototype.destroyPinchZoom = /**
     * @return {?}
     */
    function () {
        if (this.isMobile()) {
            document.removeEventListener('touchstart', this.onViewerTouchStart);
            document.removeEventListener('touchmove', this.onViewerTouchMove);
            document.removeEventListener('touchend', this.onViewerTouchEnd);
        }
    };
    return PinchOnMobileSupport;
}());
export { PinchOnMobileSupport };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PinchOnMobileSupport.prototype.viewer;
    /**
     * @type {?}
     * @private
     */
    PinchOnMobileSupport.prototype.container;
    /**
     * @type {?}
     * @private
     */
    PinchOnMobileSupport.prototype.startX;
    /**
     * @type {?}
     * @private
     */
    PinchOnMobileSupport.prototype.startY;
    /**
     * @type {?}
     * @private
     */
    PinchOnMobileSupport.prototype.initialPinchDistance;
    /**
     * @type {?}
     * @private
     */
    PinchOnMobileSupport.prototype.pinchScale;
    /**
     * @type {?}
     * @private
     */
    PinchOnMobileSupport.prototype._zone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGluY2gtb24tbW9iaWxlLXN1cHBvcnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZXh0ZW5kZWQtcGRmLXZpZXdlci8iLCJzb3VyY2VzIjpbImxpYi9waW5jaC1vbi1tb2JpbGUtc3VwcG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBO0lBUUUsOEJBQW9CLEtBQWE7UUFBYixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBTHpCLFdBQU0sR0FBRyxDQUFDLENBQUM7UUFDWCxXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ1gseUJBQW9CLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFHckIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDbkIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FDNUI7SUFDSCxDQUFDOzs7OztJQUVPLHVDQUFROzs7O0lBQWhCO1FBQ0UsT0FBTyxjQUFjLElBQUksUUFBUSxDQUFDLGVBQWUsQ0FBQztJQUNwRCxDQUFDOzs7Ozs7SUFFTyxpREFBa0I7Ozs7O0lBQTFCLFVBQTJCLEtBQWlCO1FBQzFDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUM7UUFDOUIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7O2dCQUN4QixJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRTtZQUNuRCw2QkFBNkI7WUFDN0IsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQy9FLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyw4Q0FBOEMsRUFBRTtv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O1FBQ0UsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDbkIsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNwRSxRQUFRLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2xFLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDakU7SUFDSCxDQUFDO0lBQ0gsMkJBQUM7QUFBRCxDQUFDLEFBaEhELElBZ0hDOzs7Ozs7O0lBL0dDLHNDQUFvQjs7Ozs7SUFDcEIseUNBQWtDOzs7OztJQUNsQyxzQ0FBbUI7Ozs7O0lBQ25CLHNDQUFtQjs7Ozs7SUFDbkIsb0RBQWlDOzs7OztJQUNqQywwQ0FBdUI7Ozs7O0lBRVgscUNBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJUERGVmlld2VyQXBwbGljYXRpb25PcHRpb25zIH0gZnJvbSAnLi9vcHRpb25zL3BkZi12aWV3ZXItYXBwbGljYXRpb24tb3B0aW9ucyc7XG5cbmV4cG9ydCBjbGFzcyBQaW5jaE9uTW9iaWxlU3VwcG9ydCB7XG4gIHByaXZhdGUgdmlld2VyOiBhbnk7XG4gIHByaXZhdGUgY29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcbiAgcHJpdmF0ZSBzdGFydFggPSAwO1xuICBwcml2YXRlIHN0YXJ0WSA9IDA7XG4gIHByaXZhdGUgaW5pdGlhbFBpbmNoRGlzdGFuY2UgPSAwO1xuICBwcml2YXRlIHBpbmNoU2NhbGUgPSAxO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3pvbmU6IE5nWm9uZSkge1xuICAgIGlmICh0aGlzLmlzTW9iaWxlKCkpIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZVBpbmNoWm9vbSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaXNNb2JpbGUoKSB7XG4gICAgcmV0dXJuICdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgfVxuXG4gIHByaXZhdGUgb25WaWV3ZXJUb3VjaFN0YXJ0KGV2ZW50OiBUb3VjaEV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5pbml0aWFsUGluY2hEaXN0YW5jZSA9IDA7XG4gICAgaWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoID09PSAyKSB7XG4gICAgICBjb25zdCByZWN0ID0gdGhpcy5jb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAvLyArIHRoaXMuY29udGFpbmVyLnNjcm9sbFRvcFxuICAgICAgaWYgKGV2ZW50LnRvdWNoZXNbMF0ucGFnZVggPj0gcmVjdC5sZWZ0ICYmIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVggPD0gcmVjdC5yaWdodCkge1xuICAgICAgICBpZiAoZXZlbnQudG91Y2hlc1swXS5wYWdlWSA+PSByZWN0LnRvcCAvKiAmJiBldmVudC50b3VjaGVzWzBdLnBhZ2VZIDw9IHJlY3QuYm90dG9tICovKSB7XG4gICAgICAgICAgaWYgKGV2ZW50LnRvdWNoZXNbMV0ucGFnZVggPj0gcmVjdC5sZWZ0ICYmIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVggPD0gcmVjdC5yaWdodCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnRvdWNoZXNbMV0ucGFnZVkgPj0gcmVjdC50b3AgLyogJiYgZXZlbnQudG91Y2hlc1sxXS5wYWdlWSA8PSByZWN0LmJvdHRvbSAgKi8pIHtcbiAgICAgICAgICAgICAgdGhpcy5zdGFydFggPSAoZXZlbnQudG91Y2hlc1swXS5wYWdlWCArIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVgpIC8gMjtcbiAgICAgICAgICAgICAgdGhpcy5zdGFydFkgPSAoZXZlbnQudG91Y2hlc1swXS5wYWdlWSArIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVkpIC8gMjtcbiAgICAgICAgICAgICAgdGhpcy5pbml0aWFsUGluY2hEaXN0YW5jZSA9IE1hdGguaHlwb3QoZXZlbnQudG91Y2hlc1sxXS5wYWdlWCAtIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVkgLSBldmVudC50b3VjaGVzWzBdLnBhZ2VZKTtcbiAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvblZpZXdlclRvdWNoTW92ZShldmVudDogVG91Y2hFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IFBERlZpZXdlckFwcGxpY2F0aW9uT3B0aW9uczogSVBERlZpZXdlckFwcGxpY2F0aW9uT3B0aW9ucyA9ICh3aW5kb3cgYXMgYW55KS5QREZWaWV3ZXJBcHBsaWNhdGlvbk9wdGlvbnM7XG5cbiAgICBpZiAodGhpcy5pbml0aWFsUGluY2hEaXN0YW5jZSA8PSAwIHx8IGV2ZW50LnRvdWNoZXMubGVuZ3RoICE9PSAyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnBpbmNoU2NhbGUgIT09IDEpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIGNvbnN0IHBpbmNoRGlzdGFuY2UgPSBNYXRoLmh5cG90KGV2ZW50LnRvdWNoZXNbMV0ucGFnZVggLSBldmVudC50b3VjaGVzWzBdLnBhZ2VYLCBldmVudC50b3VjaGVzWzFdLnBhZ2VZIC0gZXZlbnQudG91Y2hlc1swXS5wYWdlWSk7XG4gICAgY29uc3Qgb3JpZ2luWCA9IHRoaXMuc3RhcnRYICsgdGhpcy5jb250YWluZXIuc2Nyb2xsTGVmdDtcbiAgICBjb25zdCBvcmlnaW5ZID0gdGhpcy5zdGFydFkgKyB0aGlzLmNvbnRhaW5lci5zY3JvbGxUb3A7XG4gICAgdGhpcy5waW5jaFNjYWxlID0gcGluY2hEaXN0YW5jZSAvIHRoaXMuaW5pdGlhbFBpbmNoRGlzdGFuY2U7XG4gICAgbGV0IG1pblpvb20gPSBOdW1iZXIoUERGVmlld2VyQXBwbGljYXRpb25PcHRpb25zLmdldCgnbWluWm9vbScpKTtcbiAgICBpZiAoIW1pblpvb20pIHtcbiAgICAgIG1pblpvb20gPSAwLjE7XG4gICAgfVxuICAgIGlmICh0aGlzLnBpbmNoU2NhbGUgPCBtaW5ab29tKSB7XG4gICAgICB0aGlzLnBpbmNoU2NhbGUgPSBtaW5ab29tO1xuICAgIH1cbiAgICBsZXQgbWF4Wm9vbSA9IE51bWJlcihQREZWaWV3ZXJBcHBsaWNhdGlvbk9wdGlvbnMuZ2V0KCdtYXhab29tJykpO1xuICAgIGlmICghbWF4Wm9vbSkge1xuICAgICAgbWF4Wm9vbSA9IDEwO1xuICAgIH1cbiAgICBpZiAodGhpcy5waW5jaFNjYWxlID4gbWF4Wm9vbSkge1xuICAgICAgdGhpcy5waW5jaFNjYWxlID0gbWF4Wm9vbTtcbiAgICB9XG4gICAgdGhpcy52aWV3ZXIuc3R5bGUudHJhbnNmb3JtID0gYHNjYWxlKCR7dGhpcy5waW5jaFNjYWxlfSlgO1xuICAgIHRoaXMudmlld2VyLnN0eWxlLnRyYW5zZm9ybU9yaWdpbiA9IGAke29yaWdpblh9cHggJHtvcmlnaW5ZfXB4YDtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgcHJpdmF0ZSBvblZpZXdlclRvdWNoRW5kKGV2ZW50OiBUb3VjaEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgUERGVmlld2VyQXBwbGljYXRpb246IGFueSA9ICh3aW5kb3cgYXMgYW55KS5QREZWaWV3ZXJBcHBsaWNhdGlvbjtcbiAgICBpZiAodGhpcy5pbml0aWFsUGluY2hEaXN0YW5jZSA8PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudmlld2VyLnN0eWxlLnRyYW5zZm9ybSA9IGBub25lYDtcbiAgICB0aGlzLnZpZXdlci5zdHlsZS50cmFuc2Zvcm1PcmlnaW4gPSBgdW5zZXRgO1xuICAgIFBERlZpZXdlckFwcGxpY2F0aW9uLnBkZlZpZXdlci5jdXJyZW50U2NhbGUgKj0gdGhpcy5waW5jaFNjYWxlO1xuICAgIGNvbnN0IHJlY3QgPSB0aGlzLmNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBkeCA9IHRoaXMuc3RhcnRYIC0gcmVjdC5sZWZ0O1xuICAgIGNvbnN0IGR5ID0gdGhpcy5zdGFydFkgLSByZWN0LnRvcDtcbiAgICB0aGlzLmNvbnRhaW5lci5zY3JvbGxMZWZ0ICs9IGR4ICogKHRoaXMucGluY2hTY2FsZSAtIDEpO1xuICAgIHRoaXMuY29udGFpbmVyLnNjcm9sbFRvcCArPSBkeSAqICh0aGlzLnBpbmNoU2NhbGUgLSAxKTtcbiAgICB0aGlzLnJlc2V0UGluY2hab29tUGFyYW1zKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRQaW5jaFpvb21QYXJhbXMoKTogdm9pZCB7XG4gICAgdGhpcy5zdGFydFggPSB0aGlzLnN0YXJ0WSA9IHRoaXMuaW5pdGlhbFBpbmNoRGlzdGFuY2UgPSAwO1xuICAgIHRoaXMucGluY2hTY2FsZSA9IDE7XG4gIH1cblxuICBwdWJsaWMgaW5pdGlhbGl6ZVBpbmNoWm9vbSgpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3ZXInKTtcbiAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3ZXJDb250YWluZXInKSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uVmlld2VyVG91Y2hTdGFydC5iaW5kKHRoaXMpKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMub25WaWV3ZXJUb3VjaE1vdmUuYmluZCh0aGlzKSwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5vblZpZXdlclRvdWNoRW5kLmJpbmQodGhpcykpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGRlc3Ryb3lQaW5jaFpvb20oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNNb2JpbGUoKSkge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMub25WaWV3ZXJUb3VjaFN0YXJ0KTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMub25WaWV3ZXJUb3VjaE1vdmUpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLm9uVmlld2VyVG91Y2hFbmQpO1xuICAgIH1cbiAgfVxufVxuIl19