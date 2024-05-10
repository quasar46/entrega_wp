<?php
if ( ! is_active_sidebar( 'sidebar-1' ) ) {
	return;
}
?>
<div class="catalog__top">
	<?php dynamic_sidebar( 'sidebar-1' ); ?>
	<?php
	$filterreset = $_SERVER['REQUEST_URI'];
	$filterreset = strtok( $filterreset, '?' );
	?>
    <a class="filter-reset" href="<?php echo $filterreset; ?>">Сбросить
        <img src="<?php echo get_template_directory_uri() . '/assets/img/arrow-reset.svg' ?>" alt="">
    </a>
</div>

<!--    <button class="catalog__reset">Сбросить-->
<!--        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--            <path d="M9 1H15M15 1V7M15 1L1 15" stroke="url(#paint0_linear_488_3312)" stroke-linecap="round"-->
<!--                  stroke-linejoin="round"/>-->
<!--            <defs>-->
<!--                <linearGradient id="paint0_linear_488_3312" x1="15" y1="8" x2="1" y2="8"-->
<!--                                gradientUnits="userSpaceOnUse">-->
<!--                    <stop stop-color="#B2FF2E"/>-->
<!--                    <stop offset="0.524453" stop-color="#97E80C"/>-->
<!--                    <stop offset="1" stop-color="#B2FF2E"/>-->
<!--                </linearGradient>-->
<!--            </defs>-->
<!--        </svg>-->
<!---->
<!--    </button>-->