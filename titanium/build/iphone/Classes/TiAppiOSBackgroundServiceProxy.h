/**
 * _titanium _titanium Mobile
 * Copyright (c) 2009-2010 by _titanium, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 * 
 * WARNING: This is generated code. Modify at your own risk and without support.
 */
#import "TiProxy.h"

#ifdef USE_TI_APPIOS

#import "KrollBridge.h"


@interface TiAppiOSBackgroundServiceProxy : TiProxy {

@private
	KrollBridge *bridge;
}

-(void)beginBackground;
-(void)endBackground;


@end

#endif
