const config = require('../config');
module.exports = class {

	/**
	 * @param {Object} params
	 * @param {String} params.prev page on the left side
	 * @param {String} params.next page on the right side
	 * @param {String} params.type switchTab reLaunch redirectTo navigateTo
	 */
	constructor(params) {
		if (!params || !params.prev || !params.next || !params.type) {
			throw new TypeError('Invalid params');
		}
		this.swiperData = {
			startAt: 0,
			startX: 0,
			startY: 0,
			endX: 0,
			endY: 0,
			moving: false
		};
		Object.defineProperty(this, config.SWIPER.READONLY_KEY, {
			enumerable: false,
			writable: false
		});
		this.swiperTouchstart = e => {
			this.swiperData.startAt = e.timeStamp;
			this.swiperData.startX = e.touches[0].pageX;
			this.swiperData.startY = e.touches[0].pageY;
			this.swiperData.moving = false;

		};
		this.swiperTouchmove = e => {
			this.swiperData.endX = e.touches[0].pageX;
			this.swiperData.endY = e.touches[0].pageY;
			this.swiperData.moving = true;
		};
		this.swiperTouchend = e => {
			let gapY = Math.abs(this.swiperData.startY - this.swiperData.endY);
			if (e.timeStamp - this.swiperData.startAt > config.SWIPER.DURATION || !this.swiperData.moving || gapY > config.SWIPER.MAX_Y) {
				return;
			}
			let url;
			let gapX = this.swiperData.startX - this.swiperData.endX;
			if (gapX > config.SWIPER.MIN_X) {
				url = params.next;
			} else if (gapX < -config.SWIPER.MIN_X) {
				url = params.prev;
			} else {
				return;
			}
			wx[params.type]({ url });
		};
	}

};
