<?php
/*
 * Plugin Name: Kindful Fundraising Meter
 * Author: C. Skyler Young
 * Description: Simple widget, displayed via shortcode, that displays a fundraising meter for public campaigns in Kindful.
 */

namespace sv;

function kindful_meter_init( $atts ) {

    // Add script
    wp_enqueue_script( 'sv-kindful-meter', plugin_dir_url( __FILE__ ) . 'kindful-meter.js', null, null, true );

    // Define Attributes
    $a = shortcode_atts( array(
		'kindful-url' => '',
        'color' => '',
        'height' => '',
        'width' => '',
	), $atts );

    $html = '<div id="kindful-meter"';

    foreach($a as $att => $val) {
        if ( ! empty($val) ) {
            $html .= ' data-' . $att . '="' . $val . '"';
        }
    }

    $html .= '></div>';

	return $html;
}

add_shortcode( 'kindful_meter', 'sv\kindful_meter_init' );