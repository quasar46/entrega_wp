<?php get_header(); ?>

<?php
//получение атрибутов
$pa_args              = array();
$attribute_taxonomies = wc_get_attribute_taxonomies();
if ( 0 !== count( $attribute_taxonomies ) ) {
	foreach ( $attribute_taxonomies as $one_tax ) {
		$pa_args[] = get_terms( $one_tax, array(
			'hide_empty' => false,
		) );
		echo '<pre>';
		print_r($one_tax);
		echo '</pre>';
	}
};


// получение значений атрибутов
$attribute_values = wc_get_product_terms($product->id, 'pa_ ', массив('поля' => 'имена'));
// Заменять с вашим фактическим именем атрибута! Еогеасп ($attribute_values как $value) {echo $value; }



global $product;
$terms=get_terms('pa_moshhnost');
echo '<pre>';
var_dump($terms);
echo '</pre>';
foreach ($terms as $each_term) {
    echo '<h2>'.$each_term->name.'</h2>';
}
?>

<?php get_footer(); ?>


