import config from '../config';

/**
 * @param {Object} params
 * @param {String} params.prev page on the left side
 * @param {String} params.next page on the right side
 * @param {String} params.type switchTab reLaunch redirectTo navigateTo
 * @see {wxml} <view class='relative' style='left:{{swiperX}}' bind:touchstart="swiperTouchstart" bind:touchmove="swiperTouchmove" bind:touchend="swiperTouchend">
 */
module.exports = params => {
	if (!params || !params.prev || !params.next || !params.type) {
		throw new TypeError('Invalid params');
	}
	return {
		swiperData: {
			startAt: 0,
			startX: 0,
			startY: 0,
			endX: 0,
			endY: 0,
			moving: false
		},
		swiperTouchstart(e) {
			this.swiperData.startAt = e.timeStamp;
			this.swiperData.startX = e.touches[0].pageX;
			this.swiperData.startY = e.touches[0].pageY;
			this.swiperData.moving = false;
		},
		swiperTouchmove(e) {
			let { endX: beforeX, startY: basicY, startX } = this.swiperData;
			let { pageX: currentX, pageY: currentY } = e.touches[0];
			if (Math.abs(currentY - basicY) > config.SWIPER.MAX_Y) {
				this.swiperData.endX = startX;
				this.setData({
					swiperX: '0'
				});
				return;
			}
			if (Math.abs(currentX - beforeX) < 5) {
				return;
			}
			this.swiperData.endX = currentX;
			this.swiperData.endY = currentY;
			this.swiperData.moving = true;

			this.setData({
				swiperX: (currentX - this.swiperData.startX) * 1.5 + 'rpx'
			});
		},
		swiperTouchend(e) {
			if (this.data.swiperX) {
				this.setData({
					swiperX: 0
				});
			}
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
		}
	};
};
