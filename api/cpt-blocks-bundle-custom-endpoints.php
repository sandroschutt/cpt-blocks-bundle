<?php
add_action('rest_api_init', function () {
    register_rest_route('wp/v2', '/cpt-post-types', array(
        'methods' => 'GET',
        'callback' => 'cpt_blocks_bundle_get_custom_post_types',
    ));
});

function cpt_blocks_bundle_get_custom_post_types()
{
    $post_types = get_post_types(array('public' => true), 'objects');
    $excluded_types = array('attachment', 'page');
    $post_types_list = array();

    foreach ($post_types as $post_type) {
        if (!in_array($post_type->name, $excluded_types)) :
            $post_types_list[] = array(
                'value' => $post_type->name,
                'label' => $post_type->label
            );
        endif;
    }

    return new WP_REST_Response($post_types_list, 200);
}
