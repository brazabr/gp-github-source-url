<?php
/**
 * Plugin Name: GP Github Source Url
 * Plugin URI:  https://github.com/brazabr/gp-github-source-url
 * Description: Modifies GlotPress to make source urls compatible with Github
 * Version:     0.1.0
 * Author:      Thiago Benvenuto
 * Author URI:  https://profiles.wordpress.org/brazabr
 * License:     GPLv2+
 * Text Domain: gp-github-source-url
 * Domain Path: /languages
 */

/**
 * Copyright (c) 2017 Thiago Benvenuto (email : brazabr@gmail.com)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License, version 2 or, at
 * your discretion, any later version, as published by the Free
 * Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */

// Useful global constants
define( 'GP_GITHUB_SOURCE_URL_VERSION', '0.1.0' );
define( 'GP_GITHUB_SOURCE_URL_URL',     plugin_dir_url( __FILE__ ) );
define( 'GP_GITHUB_SOURCE_URL_PATH',    dirname( __FILE__ ) . '/' );

/**
 * Default initialization for the plugin:
 * - Registers the default textdomain.
 */
function gp_github_source_url_init() {
	$locale = apply_filters( 'plugin_locale', get_locale(), 'gp-github-source-url' );
	load_textdomain( 'gp-github-source-url', WP_LANG_DIR . '/gp_github_source-url/gp-github-source-url-' . $locale . '.mo' );
	load_plugin_textdomain( 'gp-github-source-url', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );

	$minified = ( WP_DEBUG == true ) ? '' : '.min';

	wp_register_script( 'gp-github-source-url', GP_GITHUB_SOURCE_URL_URL . '/assets/js/gp-github-source-url' . $minified . '.js', [ 'jquery' ], GP_GITHUB_SOURCE_URL_VERSION, true );
	$translations = array(
		'template_example' => __( ' or https://github.com/GlotPress/GlotPress-WP/%file%#L%line%', 'gp-github-source-url' ),
	);
	wp_localize_script( 'gp-github-source-url', 'GPGitHubSourceUrl', $translations );
}

/**
 * Enqueues the javascript to modify example source url in project pages
 */
function gp_github_source_url_enqueues( $template, $args ) {
	gp_enqueue_script( 'gp-github-source-url' );
}

/**
 * Filter the source_url to make it compatible with GitHub
 */
function gp_github_source_url_filter( $source_url, $project, $file, $line ) {
    if ( strpos( $source_url, 'github.com' ) !== false ) {
        $svn_prefix = strtok( $file, '/' ) . '/';
        $new_svn_prefix = '';

        if ( strpos( $source_url, 'blob' ) === false ) {
          $svn_parts = explode( '-', $svn_prefix );
          $new_svn_prefix = 'blob/' . end( $svn_parts );
        }

        $source_url = str_replace( $svn_prefix, $new_svn_prefix, $source_url );
    }

	return $source_url;
}

// Wireup actions
add_action( 'init', 'gp_github_source_url_init' );
add_action( 'gp_pre_tmpl_load', 'gp_github_source_url_enqueues', 10, 2 );

// Wireup filters
add_filter( 'gp_reference_source_url', 'gp_github_source_url_filter', 1000, 4 );
