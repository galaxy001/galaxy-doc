#!/bin/perl

my ($type,$in) = @ARGV;

my (@sizes,$prefix,$suffix);
if ($type eq 'h') {
	@sizes = qw[ 1024x768 1280x1024 1280x800 1440x900 1366x768 1600x900 1920x1080 ];
	$prefix = 'http://www.microsoft.com/taiwan/silverlight/desktop_';
	$suffix = '.htm';
} elsif ($type eq 'p') {
	@sizes = qw[ 1024X768 1280x1024 1280x800 1440x900 1366X768 1600x900 1920X1080 ];
	$prefix = 'http://www.microsoft.com/taiwan/silverlight/images/';
	$suffix = '.jpg';
}

for my $size (@sizes) {
	my $t;
	if ($type eq 'h') {
		$t = "proxychains -q wget -mkEpnp $prefix${in}_${size}$suffix";
	} elsif ($type eq 'p') {
		$t = "proxychains -q wget -mkEpnp $prefix${size}_${in}$suffix";
	}
	print "$t\n";
	system "$t";
}

__END__
h j,l,m
p i
