<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
$protocol = $_SERVER['HTTPS'] === "" ? 'http' : 'https';
$host = $_SERVER['HTTP_HOST'];
$rest_route = "wp-json/wp/v2/" . get_post_type();
$related_field = $attributes['postType'];
$endpoint = "$protocol://$host/$rest_route/" . get_the_ID();
$response = json_decode(wp_remote_get($endpoint)['body']);
$related = $response->acf;

if ($related->$related_field !== NULL) :
 	$has_relational_field = true;

	$args = array(
		'post_type' => $attributes['postType'],
		'post__in' => $related->$related_field,
		'orderby' => 'post__in',
		'posts_per_page' => -1,
	);

	$related_items = get_posts($args);

	if (!empty($related_items)) {
		$filtered_related_items = array();

		foreach ($related_items as $item) {
			setup_postdata($item);

			$filtered_items[] = array(
				'title'   => get_the_title($item),
				'link' => get_the_permalink($item),
				'featured_image' => get_the_post_thumbnail_url($item->ID, 'full')
			);
		}

		wp_reset_postdata();
	} else {
		echo 'No posts found.';
	}
else:
	$has_relational_field = false;
endif;

?>
<p <?php echo get_block_wrapper_attributes(); ?>>
<div class="query-acf-fields">
	<?php
	if ($has_relational_field) :
		foreach ($filtered_items as $item) : ?>
			<div class="field-content">
				<div>
					<a href="<?= $item['link'] ?>">
						<div class="field-image" style="background-image: url(<?= $item['featured_image'] ?>); background-color: lightgrey"></div>
					</a>
				</div>
				<div class="field-footer">
					<a href="<?= $item['link'] ?>">
						<h5><?= $item['title']; ?></h5>
					</a>
				</div>
			</div>
	<?php endforeach;
	endif;
	if (!$has_relational_field) : ?>
		<p>Não há <?= $related_field ?> relacionados a este post :(</p>
	<? endif; ?>
</div>
</p>