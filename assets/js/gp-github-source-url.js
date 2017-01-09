/*! GP Github Source Url - v0.1.0
 * https://github.com/brazabr/gp-github-source-url
 * Copyright (c) 2017; * Licensed GPLv2+ */
( function( $, document, translations ) {
    'use strict';

    $( document ).ready( function() {
        var $source_url = $( '#project\\[source_url_template\\] ~ span' );

        if ( $source_url.length > 0 ) {
            var $text = $source_url.text() + translations.template_example;
            $source_url.text( $text );
        }
    } );

} )( jQuery, this, GPGitHubSourceUrl );
