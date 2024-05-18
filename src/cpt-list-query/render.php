<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
$postType = $attributes['postType'];
$postsPerPage = $attributes['postsPerPage'];

$args = array(
	'post_type'      => $postType,
	'posts_per_page' => $postsPerPage,
	'orderby'        => 'date',
	'order'          => 'DESC',
);

$portfolio_query = new WP_Query($args);
?>

<p <?php echo get_block_wrapper_attributes(); ?>>
<div class="query-cpt--list">
	<?php
	if ($portfolio_query->have_posts()) : ?>
		<ul>
			<?php
			while ($portfolio_query->have_posts()) : $portfolio_query->the_post();
				$featured_image_url = get_the_post_thumbnail_url(get_the_ID(), 'full');
			?>
				<li class="query-list--item" style="background-image: url(<?php echo $featured_image_url ?>); background-size: contain; background-position: center; background-color: lightgrey">
					<div class="query-list--item--footer">
						<a href="<?= get_the_permalink() ?>">
							<h3><?php the_title(); ?></h3>
							<p><strong>Lorem Ipsum et dolor</strong></p>
						</a>
					</div>
				</li>
			<?php endwhile; ?>
		</ul>
	<?php wp_reset_postdata();
	else :
		echo '<p>No portfolio items found.</p>';
	endif;
	?>

</div>
</p>