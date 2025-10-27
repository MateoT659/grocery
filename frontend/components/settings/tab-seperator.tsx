import { useThemeColor } from '@/hooks/use-theme-color';
import React from 'react';
import { View, DimensionValue } from 'react-native';


type TabSeperatorProps = {
  color?: string,
  width?: DimensionValue
  style?: any
}

const TabSeparator = (
  {
    color = undefined,
    width = '100%' as DimensionValue,
    style = {}
  }:TabSeperatorProps
) => {
  const themeTextColor = useThemeColor({}, 'text');
  return (
    <View
      style={[{
        height: 1,
        width: width,
        backgroundColor: color ?? themeTextColor,
        marginVertical: 2,
      }, style]}
    />
  );
};

  export default TabSeparator;