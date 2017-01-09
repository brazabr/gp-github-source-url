/**
 * GlotPress Github Source Url
 * https://github.com/brazabr/glotpress_github_sourceurl
 *
 * Copyright (c) 2017 Thiago Benvenuto
 * Licensed under the GPLv2+ license.
 */

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
