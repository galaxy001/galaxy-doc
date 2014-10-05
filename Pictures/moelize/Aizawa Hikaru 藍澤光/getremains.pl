#!/bin/perl

my @sizes = qw[ 1024x768 1280x1024 1280x800 1440x900 1366x768 1600x900 1920x1080 ];
my $prefix = 'http://www.microsoft.com/taiwan/silverlight/desktop_';

for my $in (@ARGV) {
	for my $size (@sizes) {
		my $t = "proxychains -q wget -mkEpnp $prefix${in}_$size.htm";
		system "$t\n";
	}
}
