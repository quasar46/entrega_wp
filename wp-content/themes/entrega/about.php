<?php
/*
Template Name: О компании
 */
?>
<?php get_header(); ?>
<section class="first-section">
    <div class="container">
	    <?php
	    if ( function_exists( 'yoast_breadcrumb' ) ) {
		    yoast_breadcrumb( '<div class = "woocommerce-breadcrumb" >', '</div>' );
	    };
	    ?>
        <div class="about__wrap"><h1 class="title"><?php the_title();?></h1></div>
    </div>
</section>

<?php get_template_part( 'template-parts/content-about-us' ); ?>

<?php get_template_part( 'template-parts/content-partners' ); ?>
<?php get_footer(); ?>
