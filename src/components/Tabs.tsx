import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as React from 'react';
import {ScreenGroup, SCREEN_GROUPS} from '@/constants/screens';

interface TabsProps {
  onPress: (newSelectedGroup: ScreenGroup) => void;
  selectedGroup: ScreenGroup;
}

const _SCREEN_GROUPS = Object.values(SCREEN_GROUPS);

const Tabs = (props: TabsProps) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {React.Children.toArray(
          _SCREEN_GROUPS.map((group, index) => (
            <TouchableOpacity
              onPress={() => props.onPress(group)}
              style={[
                styles.tab,
                {
                  backgroundColor:
                    props.selectedGroup.name === group.name
                      ? '#222128'
                      : '#F7F7F7',
                  marginHorizontal: 6,
                  marginLeft: index === 0 ? 30 : undefined,
                  marginRight:
                    index === _SCREEN_GROUPS.length - 1 ? 30 : undefined,
                },
              ]}>
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color:
                      props.selectedGroup.name === group.name
                        ? '#F7F7F7'
                        : '#222128',
                  },
                ]}>
                {group.label}
              </Text>
            </TouchableOpacity>
          )),
        )}
      </ScrollView>
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  container: {width: '100%', marginBottom: 24},
  tab: {
    padding: 16,
    borderRadius: 50,
  },
  tabLabel: {
    fontWeight: 'bold',
  },
});
