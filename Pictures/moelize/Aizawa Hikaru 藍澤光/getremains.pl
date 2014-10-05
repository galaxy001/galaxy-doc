#!/bin/perl

my ($type,$in) = @ARGV;

my (@sizes,$prefix,$suffix);
if ($type eq 'h') {
	@sizes = qw[ 1024x768 1280x1024 1280x800 1440x900 1366x768 1600x900 1920x1080 ];
	$prefix = 'http://www.microsoft.com/taiwan/silverlight/desktop_';
	@sizes = qw[ 1024x768 1280x1024 1280x800 1440x900 1366x768 1600x900 1920x1080 1920x1200 ];
	$prefix = 'http://www.microsoft.com/taiwan/silverlight/wallpaper_summer2012';
	$suffix = '.htm';
} elsif ($type eq 'p') {
	@sizes = qw[ 1024X768 1280x1024 1280x800 1440x900 1366X768 1600x900 1920X1080 ];
	$prefix = 'http://www.microsoft.com/taiwan/silverlight/images/';
	$suffix = '.jpg';
} else {
	@sizes = qw[ 1024X768 1280x1024 1280x800 1440x900 1366X768 1600x900 1920X1080 1920x1200 ];
	$prefix = 'http://www.microsoft.com/taiwan/silverlight/images/wallpaper';
	$suffix = '.jpg';
}

for my $size (@sizes) {
	my $t;
	if ($type eq 'h') {
		$t = "proxychains -q wget -mkEpnp $prefix${in}_${size}$suffix";
	} elsif ($type eq 'p') {
		$t = "proxychains -q wget -mkEpnp $prefix${size}_${in}$suffix";
	} else {
		$t = "proxychains -q wget -mkEpnp ${prefix}_${in}_${size}_2$suffix";
	}
	print "$t\n";
	#system "$t";
}

__END__
h j,l,m
p i
x halloween2011,vd2012,cny2012,sp2012,vd2012
x halloween2012,birthday2012,xmas2012,sakuraseason2013,valentine2013,newyear2013
x layout
h
