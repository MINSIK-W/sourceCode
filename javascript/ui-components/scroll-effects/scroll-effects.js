function systemBtnAction() {
	const item = document.querySelector('.system_btn');
	const wrapper = document.querySelector('.system-btn-wrapper');

	if (!item || !wrapper) return; // 요소가 없으면 함수 종료

	// 위치 정보 가져오기
	const wrapperRect = wrapper.getBoundingClientRect();
	//하단 위치 계산
	const action = wrapperRect.bottom;
	// 창의 높이가 wrapper의 하단보다 크면 'move' 제거, 아니면 'move' 추가
	if (window.innerHeight > action) {
		item.classList.remove('move');
	} else {
		item.classList.add('move');
	}
}

// DOM이 완전히 로드된 후에 코드를 실행
document.addEventListener('DOMContentLoaded', function() {
	systemBtnAction(); // 초기 실행

	// 스크롤 이벤트 리스너 추가 및 성능 최적화를 위해 requestAnimationFrame을 사용하여 throttle을 적용
	let ticking = false;
	window.addEventListener('scroll', function() {
		if (!ticking) {
			window.requestAnimationFrame(function() {
				systemBtnAction();
				ticking = false;
			});
			ticking = true;
		}
	});

	// 리사이즈 이벤트 리스너 추가 성능 최적화를 위해 setTimeout을 사용하여 debounce를 적용
	let resizeTimer;
	window.addEventListener('resize', function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(systemBtnAction, 100);
	});
});