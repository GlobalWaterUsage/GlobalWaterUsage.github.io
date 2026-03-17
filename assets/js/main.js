/*
	Phantom by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(
	function($) {

		var	$window = $(window),
			$body = $('body');

		// Breakpoints.
			breakpoints({
				xlarge:   [ '1281px',  '1680px' ],
				large:    [ '981px',   '1280px' ],
				medium:   [ '737px',   '980px'  ],
				small:    [ '481px',   '736px'  ],
				xsmall:   [ '361px',   '480px'  ],
				xxsmall:  [ null,      '360px'  ]
			});

		// Play initial animations on page load.
			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-preload');
				}, 100);
			});

		// Touch?
			if (browser.mobile)
				$body.addClass('is-touch');

		// Forms.
			var $form = $('form');

			// Auto-resizing textareas.
				$form.find('textarea').each(function() {

					var $this = $(this),
						$wrapper = $('<div class="textarea-wrapper"></div>'),
						$submits = $this.find('input[type="submit"]');

					$this
						.wrap($wrapper)
						.attr('rows', 1)
						.css('overflow', 'hidden')
						.css('resize', 'none')
						.on('keydown', function(event) {

							if (event.keyCode == 13
							&&	event.ctrlKey) {

								event.preventDefault();
								event.stopPropagation();

								$(this).blur();

							}

						})
						.on('blur focus', function() {
							$this.val($.trim($this.val()));
						})
						.on('input blur focus --init', function() {

							$wrapper
								.css('height', $this.height());

							$this
								.css('height', 'auto')
								.css('height', $this.prop('scrollHeight') + 'px');

						})
						.on('keyup', function(event) {

							if (event.keyCode == 9)
								$this
									.select();

						})
						.triggerHandler('--init');

					// Fix.
						if (browser.name == 'ie'
						||	browser.mobile)
							$this
								.css('max-height', '10em')
								.css('overflow-y', 'auto');

				});

		// Menu.
			var $menu = $('#menu');

			$menu.wrapInner('<div class="inner"></div>');

			$menu._locked = false;

			$menu._lock = function() {

				if ($menu._locked)
					return false;

				$menu._locked = true;

				window.setTimeout(function() {
					$menu._locked = false;
				}, 350);

				return true;

			};

			$menu._show = function() {

				if ($menu._lock())
					$body.addClass('is-menu-visible');

			};

			$menu._hide = function() {

				if ($menu._lock())
					$body.removeClass('is-menu-visible');

			};

			$menu._toggle = function() {

				if ($menu._lock())
					$body.toggleClass('is-menu-visible');

			};

			$menu
				.appendTo($body)
				.on('click', function(event) {
					event.stopPropagation();
				})
				.on('click', 'a', function(event) {

					var href = $(this).attr('href');

					event.preventDefault();
					event.stopPropagation();

					// Hide.
						$menu._hide();

					// Redirect.
						if (href == '#menu')
							return;

						window.setTimeout(function() {
							window.location.href = href;
						}, 350);

				})
				.append('<a class="close" href="#menu">Close</a>');

			$body
				.on('click', 'a[href="#menu"]', function(event) {

					event.stopPropagation();
					event.preventDefault();

					// Toggle.
						$menu._toggle();

				})
				.on('click', function(event) {

					// Hide.
						$menu._hide();

				})
				.on('keydown', function(event) {

					// Hide on escape.
						if (event.keyCode == 27)
							$menu._hide();

				});

	}
)(jQuery);

// Simple mock contact form notification rendered within the page.
function showContactMockMessage() {
	var existing = document.getElementById('contact-mock-notification');

	if (!existing) {
		existing = document.createElement('div');
		existing.id = 'contact-mock-notification';
		existing.style.position = 'fixed';
		existing.style.right = '1.5rem';
		existing.style.bottom = '1.5rem';
		existing.style.maxWidth = '320px';
		existing.style.padding = '0.85rem 1rem';
		existing.style.backgroundColor = 'rgba(88, 88, 88, 0.95)';
		existing.style.color = '#ffffff';
		existing.style.fontSize = '0.9rem';
		existing.style.borderRadius = '4px';
		existing.style.boxShadow = '0 0.35rem 0.75rem rgba(0, 0, 0, 0.25)';
		existing.style.zIndex = '9999';
		existing.style.cursor = 'pointer';
		existing.style.textAlign = 'left';
		existing.title = 'Click to dismiss';

		existing.addEventListener('click', function () {
			existing.style.opacity = '0';
			setTimeout(function () {
				if (existing && existing.parentNode) {
					existing.parentNode.removeChild(existing);
				}
			}, 200);
		});

		document.body.appendChild(existing);
	}

	existing.textContent = 'Thank you for your message, we will aim to get back to you as soon as possible.';
	existing.style.opacity = '1';

	// Auto-hide after a few seconds.
	clearTimeout(existing._hideTimer);
	existing._hideTimer = setTimeout(function () {
		if (!existing.parentNode) return;
		existing.style.opacity = '0';
		setTimeout(function () {
			if (existing && existing.parentNode) {
				existing.parentNode.removeChild(existing);
			}
		}, 200);
	}, 4000);
}