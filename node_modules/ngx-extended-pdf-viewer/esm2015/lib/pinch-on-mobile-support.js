/**
 * @fileoverview added by tsickle
 * Generated from: lib/pinch-on-mobile-support.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class PinchOnMobileSupport {
    /**
     * @param {?} _zone
     */
    constructor(_zone) {
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
    isMobile() {
        return 'ontouchstart' in document.documentElement;
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    onViewerTouchStart(event) {
        this.initialPinchDistance = 0;
        if (event.touches.length === 2) {
            /** @type {?} */
            const rect = this.container.getBoundingClientRect();
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
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    onViewerTouchMove(event) {
        /** @type {?} */
        const PDFViewerApplicationOptions = ((/** @type {?} */ (window))).PDFViewerApplicationOptions;
        if (this.initialPinchDistance <= 0 || event.touches.length !== 2) {
            return;
        }
        if (this.pinchScale !== 1) {
            event.preventDefault();
        }
        /** @type {?} */
        const pinchDistance = Math.hypot(event.touches[1].pageX - event.touches[0].pageX, event.touches[1].pageY - event.touches[0].pageY);
        /** @type {?} */
        const originX = this.startX + this.container.scrollLeft;
        /** @type {?} */
        const originY = this.startY + this.container.scrollTop;
        this.pinchScale = pinchDistance / this.initialPinchDistance;
        /** @type {?} */
        let minZoom = Number(PDFViewerApplicationOptions.get('minZoom'));
        if (!minZoom) {
            minZoom = 0.1;
        }
        if (this.pinchScale < minZoom) {
            this.pinchScale = minZoom;
        }
        /** @type {?} */
        let maxZoom = Number(PDFViewerApplicationOptions.get('maxZoom'));
        if (!maxZoom) {
            maxZoom = 10;
        }
        if (this.pinchScale > maxZoom) {
            this.pinchScale = maxZoom;
        }
        this.viewer.style.transform = `scale(${this.pinchScale})`;
        this.viewer.style.transformOrigin = `${originX}px ${originY}px`;
        event.preventDefault();
        event.stopPropagation();
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    onViewerTouchEnd(event) {
        /** @type {?} */
        const PDFViewerApplication = ((/** @type {?} */ (window))).PDFViewerApplication;
        if (this.initialPinchDistance <= 0) {
            return;
        }
        this.viewer.style.transform = `none`;
        this.viewer.style.transformOrigin = `unset`;
        PDFViewerApplication.pdfViewer.currentScale *= this.pinchScale;
        /** @type {?} */
        const rect = this.container.getBoundingClientRect();
        /** @type {?} */
        const dx = this.startX - rect.left;
        /** @type {?} */
        const dy = this.startY - rect.top;
        this.container.scrollLeft += dx * (this.pinchScale - 1);
        this.container.scrollTop += dy * (this.pinchScale - 1);
        this.resetPinchZoomParams();
        event.preventDefault();
        event.stopPropagation();
    }
    /**
     * @private
     * @return {?}
     */
    resetPinchZoomParams() {
        this.startX = this.startY = this.initialPinchDistance = 0;
        this.pinchScale = 1;
    }
    /**
     * @return {?}
     */
    initializePinchZoom() {
        this.viewer = document.getElementById('viewer');
        this.container = (/** @type {?} */ (document.getElementById('viewerContainer')));
        this._zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            document.addEventListener('touchstart', this.onViewerTouchStart.bind(this));
            document.addEventListener('touchmove', this.onViewerTouchMove.bind(this), { passive: false });
            document.addEventListener('touchend', this.onViewerTouchEnd.bind(this));
        }));
    }
    /**
     * @return {?}
     */
    destroyPinchZoom() {
        if (this.isMobile()) {
            document.removeEventListener('touchstart', this.onViewerTouchStart);
            document.removeEventListener('touchmove', this.onViewerTouchMove);
            document.removeEventListener('touchend', this.onViewerTouchEnd);
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGluY2gtb24tbW9iaWxlLXN1cHBvcnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZXh0ZW5kZWQtcGRmLXZpZXdlci8iLCJzb3VyY2VzIjpbImxpYi9waW5jaC1vbi1tb2JpbGUtc3VwcG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLE1BQU0sT0FBTyxvQkFBb0I7Ozs7SUFRL0IsWUFBb0IsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7UUFMekIsV0FBTSxHQUFHLENBQUMsQ0FBQztRQUNYLFdBQU0sR0FBRyxDQUFDLENBQUM7UUFDWCx5QkFBb0IsR0FBRyxDQUFDLENBQUM7UUFDekIsZUFBVSxHQUFHLENBQUMsQ0FBQztRQUdyQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNuQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztTQUM1QjtJQUNILENBQUM7Ozs7O0lBRU8sUUFBUTtRQUNkLE9BQU8sY0FBYyxJQUFJLFFBQVEsQ0FBQyxlQUFlLENBQUM7SUFDcEQsQ0FBQzs7Ozs7O0lBRU8sa0JBQWtCLENBQUMsS0FBaUI7UUFDMUMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQztRQUM5QixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTs7a0JBQ3hCLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFxQixFQUFFO1lBQ25ELDZCQUE2QjtZQUM3QixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDL0UsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLDhDQUE4QyxFQUFFO29C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LFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDcEUsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNsRSxRQUFRLENBQUMsbUJBQW1CLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQ2pFO0lBQ0gsQ0FBQztDQUNGOzs7Ozs7SUEvR0Msc0NBQW9COzs7OztJQUNwQix5Q0FBa0M7Ozs7O0lBQ2xDLHNDQUFtQjs7Ozs7SUFDbkIsc0NBQW1COzs7OztJQUNuQixvREFBaUM7Ozs7O0lBQ2pDLDBDQUF1Qjs7Ozs7SUFFWCxxQ0FBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElQREZWaWV3ZXJBcHBsaWNhdGlvbk9wdGlvbnMgfSBmcm9tICcuL29wdGlvbnMvcGRmLXZpZXdlci1hcHBsaWNhdGlvbi1vcHRpb25zJztcblxuZXhwb3J0IGNsYXNzIFBpbmNoT25Nb2JpbGVTdXBwb3J0IHtcbiAgcHJpdmF0ZSB2aWV3ZXI6IGFueTtcbiAgcHJpdmF0ZSBjb250YWluZXI6IEhUTUxEaXZFbGVtZW50O1xuICBwcml2YXRlIHN0YXJ0WCA9IDA7XG4gIHByaXZhdGUgc3RhcnRZID0gMDtcbiAgcHJpdmF0ZSBpbml0aWFsUGluY2hEaXN0YW5jZSA9IDA7XG4gIHByaXZhdGUgcGluY2hTY2FsZSA9IDE7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfem9uZTogTmdab25lKSB7XG4gICAgaWYgKHRoaXMuaXNNb2JpbGUoKSkge1xuICAgICAgdGhpcy5pbml0aWFsaXplUGluY2hab29tKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpc01vYmlsZSgpIHtcbiAgICByZXR1cm4gJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBvblZpZXdlclRvdWNoU3RhcnQoZXZlbnQ6IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLmluaXRpYWxQaW5jaERpc3RhbmNlID0gMDtcbiAgICBpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPT09IDIpIHtcbiAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLmNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIC8vICsgdGhpcy5jb250YWluZXIuc2Nyb2xsVG9wXG4gICAgICBpZiAoZXZlbnQudG91Y2hlc1swXS5wYWdlWCA+PSByZWN0LmxlZnQgJiYgZXZlbnQudG91Y2hlc1swXS5wYWdlWCA8PSByZWN0LnJpZ2h0KSB7XG4gICAgICAgIGlmIChldmVudC50b3VjaGVzWzBdLnBhZ2VZID49IHJlY3QudG9wIC8qICYmIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkgPD0gcmVjdC5ib3R0b20gKi8pIHtcbiAgICAgICAgICBpZiAoZXZlbnQudG91Y2hlc1sxXS5wYWdlWCA+PSByZWN0LmxlZnQgJiYgZXZlbnQudG91Y2hlc1sxXS5wYWdlWCA8PSByZWN0LnJpZ2h0KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQudG91Y2hlc1sxXS5wYWdlWSA+PSByZWN0LnRvcCAvKiAmJiBldmVudC50b3VjaGVzWzFdLnBhZ2VZIDw9IHJlY3QuYm90dG9tICAqLykge1xuICAgICAgICAgICAgICB0aGlzLnN0YXJ0WCA9IChldmVudC50b3VjaGVzWzBdLnBhZ2VYICsgZXZlbnQudG91Y2hlc1sxXS5wYWdlWCkgLyAyO1xuICAgICAgICAgICAgICB0aGlzLnN0YXJ0WSA9IChldmVudC50b3VjaGVzWzBdLnBhZ2VZICsgZXZlbnQudG91Y2hlc1sxXS5wYWdlWSkgLyAyO1xuICAgICAgICAgICAgICB0aGlzLmluaXRpYWxQaW5jaERpc3RhbmNlID0gTWF0aC5oeXBvdChldmVudC50b3VjaGVzWzFdLnBhZ2VYIC0gZXZlbnQudG91Y2hlc1swXS5wYWdlWCwgZXZlbnQudG91Y2hlc1sxXS5wYWdlWSAtIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkpO1xuICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG9uVmlld2VyVG91Y2hNb3ZlKGV2ZW50OiBUb3VjaEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgUERGVmlld2VyQXBwbGljYXRpb25PcHRpb25zOiBJUERGVmlld2VyQXBwbGljYXRpb25PcHRpb25zID0gKHdpbmRvdyBhcyBhbnkpLlBERlZpZXdlckFwcGxpY2F0aW9uT3B0aW9ucztcblxuICAgIGlmICh0aGlzLmluaXRpYWxQaW5jaERpc3RhbmNlIDw9IDAgfHwgZXZlbnQudG91Y2hlcy5sZW5ndGggIT09IDIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMucGluY2hTY2FsZSAhPT0gMSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgY29uc3QgcGluY2hEaXN0YW5jZSA9IE1hdGguaHlwb3QoZXZlbnQudG91Y2hlc1sxXS5wYWdlWCAtIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMV0ucGFnZVkgLSBldmVudC50b3VjaGVzWzBdLnBhZ2VZKTtcbiAgICBjb25zdCBvcmlnaW5YID0gdGhpcy5zdGFydFggKyB0aGlzLmNvbnRhaW5lci5zY3JvbGxMZWZ0O1xuICAgIGNvbnN0IG9yaWdpblkgPSB0aGlzLnN0YXJ0WSArIHRoaXMuY29udGFpbmVyLnNjcm9sbFRvcDtcbiAgICB0aGlzLnBpbmNoU2NhbGUgPSBwaW5jaERpc3RhbmNlIC8gdGhpcy5pbml0aWFsUGluY2hEaXN0YW5jZTtcbiAgICBsZXQgbWluWm9vbSA9IE51bWJlcihQREZWaWV3ZXJBcHBsaWNhdGlvbk9wdGlvbnMuZ2V0KCdtaW5ab29tJykpO1xuICAgIGlmICghbWluWm9vbSkge1xuICAgICAgbWluWm9vbSA9IDAuMTtcbiAgICB9XG4gICAgaWYgKHRoaXMucGluY2hTY2FsZSA8IG1pblpvb20pIHtcbiAgICAgIHRoaXMucGluY2hTY2FsZSA9IG1pblpvb207XG4gICAgfVxuICAgIGxldCBtYXhab29tID0gTnVtYmVyKFBERlZpZXdlckFwcGxpY2F0aW9uT3B0aW9ucy5nZXQoJ21heFpvb20nKSk7XG4gICAgaWYgKCFtYXhab29tKSB7XG4gICAgICBtYXhab29tID0gMTA7XG4gICAgfVxuICAgIGlmICh0aGlzLnBpbmNoU2NhbGUgPiBtYXhab29tKSB7XG4gICAgICB0aGlzLnBpbmNoU2NhbGUgPSBtYXhab29tO1xuICAgIH1cbiAgICB0aGlzLnZpZXdlci5zdHlsZS50cmFuc2Zvcm0gPSBgc2NhbGUoJHt0aGlzLnBpbmNoU2NhbGV9KWA7XG4gICAgdGhpcy52aWV3ZXIuc3R5bGUudHJhbnNmb3JtT3JpZ2luID0gYCR7b3JpZ2luWH1weCAke29yaWdpbll9cHhgO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBwcml2YXRlIG9uVmlld2VyVG91Y2hFbmQoZXZlbnQ6IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBQREZWaWV3ZXJBcHBsaWNhdGlvbjogYW55ID0gKHdpbmRvdyBhcyBhbnkpLlBERlZpZXdlckFwcGxpY2F0aW9uO1xuICAgIGlmICh0aGlzLmluaXRpYWxQaW5jaERpc3RhbmNlIDw9IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy52aWV3ZXIuc3R5bGUudHJhbnNmb3JtID0gYG5vbmVgO1xuICAgIHRoaXMudmlld2VyLnN0eWxlLnRyYW5zZm9ybU9yaWdpbiA9IGB1bnNldGA7XG4gICAgUERGVmlld2VyQXBwbGljYXRpb24ucGRmVmlld2VyLmN1cnJlbnRTY2FsZSAqPSB0aGlzLnBpbmNoU2NhbGU7XG4gICAgY29uc3QgcmVjdCA9IHRoaXMuY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGR4ID0gdGhpcy5zdGFydFggLSByZWN0LmxlZnQ7XG4gICAgY29uc3QgZHkgPSB0aGlzLnN0YXJ0WSAtIHJlY3QudG9wO1xuICAgIHRoaXMuY29udGFpbmVyLnNjcm9sbExlZnQgKz0gZHggKiAodGhpcy5waW5jaFNjYWxlIC0gMSk7XG4gICAgdGhpcy5jb250YWluZXIuc2Nyb2xsVG9wICs9IGR5ICogKHRoaXMucGluY2hTY2FsZSAtIDEpO1xuICAgIHRoaXMucmVzZXRQaW5jaFpvb21QYXJhbXMoKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldFBpbmNoWm9vbVBhcmFtcygpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXJ0WCA9IHRoaXMuc3RhcnRZID0gdGhpcy5pbml0aWFsUGluY2hEaXN0YW5jZSA9IDA7XG4gICAgdGhpcy5waW5jaFNjYWxlID0gMTtcbiAgfVxuXG4gIHB1YmxpYyBpbml0aWFsaXplUGluY2hab29tKCk6IHZvaWQge1xuICAgIHRoaXMudmlld2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXdlcicpO1xuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXdlckNvbnRhaW5lcicpIGFzIEhUTUxEaXZFbGVtZW50O1xuICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMub25WaWV3ZXJUb3VjaFN0YXJ0LmJpbmQodGhpcykpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5vblZpZXdlclRvdWNoTW92ZS5iaW5kKHRoaXMpLCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLm9uVmlld2VyVG91Y2hFbmQuYmluZCh0aGlzKSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZGVzdHJveVBpbmNoWm9vbSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc01vYmlsZSgpKSB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5vblZpZXdlclRvdWNoU3RhcnQpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5vblZpZXdlclRvdWNoTW92ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMub25WaWV3ZXJUb3VjaEVuZCk7XG4gICAgfVxuICB9XG59XG4iXX0=