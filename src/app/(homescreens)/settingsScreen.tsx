import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { Horarios } from '@/components/settingsComponent/Horarios';

export default function ProfilePage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.segmented}>
        <SegmentedControlTab
          values={['Horarios', 'Notificaciones']}
          selectedIndex={selectedIndex}
          onTabPress={(index) => setSelectedIndex(index)}
          activeTabStyle={styles.activeTab}
          tabStyle={styles.tab}
          tabTextStyle={styles.tabText}
          activeTabTextStyle={styles.activeTabText}
          borderRadius={16}
        />
      </View>
      <View style={{ width: '100%', height: '100%' }}>
        <Horarios />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 21,
    paddingHorizontal: 16,
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  segmented: {
    width: '100%',
    backgroundColor: '#ebebeb',
    borderRadius: 16
  },
  activeTab: {
    backgroundColor: 'lightgrey',
    borderColor: '#ebebeb',
    borderWidth: 4,
    borderRadius: 14,
  },
  tab: {
    backgroundColor: '#ebebeb',
    borderColor: '#ebebeb',
    borderWidth: 6
  },
  tabText: {
    color: '#1c1c1c',
    fontSize: 16,
    fontWeight: 'bold'
  },
  activeTabText: {
    color: '#1c1c1c',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    width: '100%',
  }
});