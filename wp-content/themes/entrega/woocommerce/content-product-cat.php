<?php
/**
 * The template for displaying product category thumbnails within loops
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/content-product-cat.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 4.7.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<div <?php wc_product_cat_class( 'item', $category ); ?>>
    <span class="item__arrow">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 5H19V11" stroke="url(#paint0_linear_571_3155)" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19 5L5 19" stroke="url(#paint1_linear_571_3155)" stroke-linecap="round" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_571_3155" x1="19" y1="8" x2="12.9206" y2="7.82949" gradientUnits="userSpaceOnUse">
<stop stop-color="#0A0A0A"/>
<stop stop-color="#0A0A0A"/>
<stop offset="0.495" stop-color="#171717"/>
<stop offset="1" stop-color="#0A0A0A"/>
</linearGradient>
<linearGradient id="paint1_linear_571_3155" x1="19" y1="12" x2="4.81483" y2="11.6021" gradientUnits="userSpaceOnUse">
<stop stop-color="#0A0A0A"/>
<stop stop-color="#0A0A0A"/>
<stop offset="0.495" stop-color="#171717"/>
<stop offset="1" stop-color="#0A0A0A"/>
</linearGradient>
</defs>
</svg>

    </span>
	<?php
	/**
	 * The woocommerce_before_subcategory hook.
	 *
	 * @hooked woocommerce_template_loop_category_link_open - 10
	 */
	do_action( 'woocommerce_before_subcategory', $category );
	/**
	 * The woocommerce_shop_loop_subcategory_title hook.
	 *
	 * @hooked woocommerce_template_loop_category_title - 10
	 */
	do_action( 'woocommerce_shop_loop_subcategory_title', $category );
	/**
	 * The woocommerce_before_subcategory_title hook.
	 *
	 * @hooked woocommerce_subcategory_thumbnail - 10
	 */
	do_action( 'woocommerce_before_subcategory_title', $category );



	/**
	 * The woocommerce_after_subcategory_title hook.
	 */
	do_action( 'woocommerce_after_subcategory_title', $category );

	/**
	 * The woocommerce_after_subcategory hook.
	 *
	 * @hooked woocommerce_template_loop_category_link_close - 10
	 */
	do_action( 'woocommerce_after_subcategory', $category );
	?>
</div>
