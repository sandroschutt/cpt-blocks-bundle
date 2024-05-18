<?php

/**
 * Plugin Name:       Cpt Blocks Bundle
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       cpt-blocks-bundle
 *
 * @package CreateBlock
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

require dirname(__FILE__) . "/api/cpt-blocks-bundle-custom-endpoints.php";

function create_block_cpt_blocks_bundle_block_init()
{
	try {
		$pluginDir = dirname(__FILE__);

		$block_directories = glob($pluginDir . "/build/*", GLOB_ONLYDIR);
		foreach ($block_directories as $block) {
			register_block_type($block);
		}
	} catch (\Throwable $th) {
		throw $th;
	}
}

add_action('init', 'create_block_cpt_blocks_bundle_block_init');
