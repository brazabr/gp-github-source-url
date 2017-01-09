=== GP Github Source Url ===
Contributors:      brazabr
Donate link:       https://github.com/brazabr/gp-github-source-url
Tags:              glotpress, github, link, translate, translation, source, url
Requires at least: 4.4
Tested up to:      4.7
Stable tag:        0.1.0
License:           GPLv2 or later
License URI:       http://www.gnu.org/licenses/gpl-2.0.html

Modifies GlotPress to make source urls compatible with Github

== Description ==

GlotPress is shipped with support to link source files to Trac urls (based on SVN).
This plugin implements support GitHub link to source files.

If the Source File template url is from GitHub, it will remove the SVN prefix that contains the repo slug and the branch. This will create valid links to source files to your GitHub repository.

== Installation ==

= Manual Installation =

1. Upload the entire `/gp-github-source-url` directory to the `/wp-content/plugins/` directory.
2. Activate GP Github Source Url through the 'Plugins' menu in WordPress.

== Frequently Asked Questions ==

= Who needs this plugin? =

If you have your own installation running GlotPress and one of your source files repository is hosted in GitHub, this plugin is for you.

= What does this plugin do? =

It changes the link to translation string in the source files in a way that, if the source files are hosted in GitHub, the url of the source file is modified and becomes a valid GitHub url.

= What do I need to do after installing the plugin? =

This plugin doesn't have extra settings to be modified via `wp-admin`. All you need to do is to define the url template in your GlotPress project and/or subproject to something like: `https://github.com/user/repo/%file%#L%line%`.

= Does it work with a repository that contains multiple branches? =

Yes. It will add the branch to the url automatically.

== Screenshots ==


== Changelog ==

= 0.1.0 =
* First release

== Upgrade Notice ==

= 0.1.0 =
First Release
