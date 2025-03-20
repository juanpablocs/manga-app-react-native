import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface CarouselProps {
  data: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  itemWidth?: number;
  containerStyle?: object;
  autoplay?: boolean;
  autoplayInterval?: number;
  loop?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  data,
  renderItem,
  itemWidth = screenWidth * 0.85,
  containerStyle,
  autoplay = false,
  autoplayInterval = 3000,
  loop = false,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const itemSpacing = (screenWidth - itemWidth) / 2;
  const totalItemWidth = itemWidth + itemSpacing * 2;

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (autoplay && data.length > 1) {
      intervalId = setInterval(() => {
        if (activeIndex === data.length - 1 && !loop) {
          scrollToIndex(0);
        } else {
          scrollToIndex((activeIndex + 1) % data.length);
        }
      }, autoplayInterval);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [activeIndex, autoplay, data.length, loop, autoplayInterval]);

  const scrollToIndex = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * totalItemWidth,
        animated: true,
      });
    }
    setActiveIndex(index);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / totalItemWidth);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: screenWidth / 2 - itemWidth / 2 - itemSpacing,
        }}
        snapToInterval={totalItemWidth}
        decelerationRate="fast"
        onMomentumScrollEnd={handleScroll}
      >
        {data.map((item, index) => (
          <View
            key={index}
            style={[
              styles.itemContainer,
              {
                width: itemWidth,
                marginHorizontal: itemSpacing,
              },
            ]}
          >
            {renderItem(item, index)}
          </View>
        ))}
      </ScrollView>

      {/* Indicadores */}
      <View style={styles.indicatorsContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === activeIndex && styles.activeIndicator,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 4,
  },
  activeIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4A6572',
  },
});

export default Carousel;
