<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$postList = json_decode($attributes['postsList']);
$mediaList = json_decode($attributes['mediaList']);
$postType = $attributes['postType'];
$postsPerPage = $attributes['postsPerPage'];
?>

<p <?php echo get_block_wrapper_attributes(); ?>>
<div class="query-doctors">
	<?php
	$args = array(
		'post_type'      => $postType,
		'posts_per_page' => $postsPerPage,
		'orderby'        => 'date',
		'order'          => 'DESC',
	);

	$portfolio_query = new WP_Query($args);

	if ($portfolio_query->have_posts()) :
		while ($portfolio_query->have_posts()) : $portfolio_query->the_post();
			$featured_image_url = get_the_post_thumbnail_url(get_the_ID(), 'full');
			$excerpt = substr(get_the_excerpt(), 0, 128);
	?>
			<div class="doctor-card" style="background-image: url(<?php echo $featured_image_url ?>); background-size: cover; background-color: lightgrey">
				<div class="card-content">
					<p>
						<?php echo $excerpt ?>
					</p>
				</div>
				<div class="card-footer">
					<a href="<?= get_the_permalink() ?>">
						<h5><?php the_title(); ?></h5>
						<p><strong>Lorem Ipsum et dolor</strong></p>
					</a>
				</div>
			</div>
	<?php endwhile;
		wp_reset_postdata();
	else :
		echo '<p>No portfolio items found.</p>';
	endif;
	?>

</div>
</p>