import {
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {Colors, Text} from 'react-native-ui-lib';
import {BarChart} from 'react-native-chart-kit';

const DetailScreen = () => {
  const dispatch = useDispatch();
  const {intakeList, goal, dailyDrinkWater} = useSelector(state => state.water);
  console.log('Daily water:', dailyDrinkWater);
  //Aylık toplam değeri hesaplayan fonksiyon
  function calculateMonthlyTotals(data) {
    const monthlyTotals = {};
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const createdAt = new Date(item.createdAt);
      const monthNumber = createdAt.getMonth() + 1;
      if (!monthlyTotals[monthNumber]) {
        monthlyTotals[monthNumber] = 0;
      }
      monthlyTotals[monthNumber] += parseFloat(item.amount);
    }
    return monthlyTotals;
  }
  const monthlyTotals = calculateMonthlyTotals(intakeList);
  console.log('AAA', monthlyTotals);

  //Haftalık Toplam Total değer
  function calculateWeeklyTotals(data) {
    const weeklyTotals = {};

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const createdAt = new Date(item.createdAt);
      const weekNumber = getWeekNumber(createdAt);
      if (!weeklyTotals[weekNumber]) {
        weeklyTotals[weekNumber] = 0;
      }

      weeklyTotals[weekNumber] += parseFloat(item.amount);
    }

    return weeklyTotals;
  }

  // Haftaya göre girilen su değerlerini gösterir.
  function getWeekNumber(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const daysSinceFirstDay = Math.floor(
      (date - firstDayOfYear) / (1000 * 60 * 60 * 24),
    );
    const weekNumber = Math.floor(daysSinceFirstDay / 7) + 1;
    return weekNumber;
  }

  const weeklyTotals = calculateWeeklyTotals(intakeList);
  console.log('WeeklyTotals:', weeklyTotals);
  const weeklyTotalAmount = Object.values(weeklyTotals).reduce(
    (acc, value) => acc + value,
    0,
  );
  //Grafik için data onjesi.
  const data = {
    labels: ['1.hft', '2.hft', '3.hft', '4.hf'],
    datasets: [
      {
        data: Object.values(weeklyTotals),
      },
    ],
  };
  return (
    <View flex bg-white>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={{flex: 1, padding: 10}}>
        <ScrollView>
          <Text style={styles.titleText}>İÇME SUYU DETAY RAPORLARI</Text>
          <View style={styles.goalsContainer}>
            <View style={styles.goalContainer}>
              <Text style={styles.subText}>Günlük Hedef: {goal.dailyGoal}</Text>
              <Text> Toplam miktar: {dailyDrinkWater}</Text>
            </View>
            <Text>
              {' '}
              {goal.dailyGoal / weeklyTotalAmount < 1
                ? 'Hedefe ulaştınız'
                : 'Hedefe Ulaşmaya Az kaldı '}
            </Text>
          </View>

          <View style={styles.goalsContainer}>
            <View style={styles.goalContainer}>
              <Text style={styles.subText}>
                Haftalık Hedef: {goal.weeklyGoal}
              </Text>
              <Text style={styles.subText}>
                {' '}
                Toplam miktar: {weeklyTotalAmount}
              </Text>
            </View>
            <Text style={styles.subText}>
              {' '}
              {goal.dailyGoal / weeklyTotalAmount < 1
                ? 'Hedefe ulaştınız'
                : 'Hedefe Ulaşmaya Az kaldı '}
            </Text>
          </View>
          <View style={styles.goalsContainer}>
            <View style={styles.goalContainer}>
              <Text style={styles.subText}>
                Aylık Hedef: {goal.monthlyGoal}
              </Text>
              <Text style={styles.subText}>
                {' '}
                Toplam miktar: {Object.values(monthlyTotals)}
              </Text>
            </View>
            <Text style={styles.subText}>
              {' '}
              {goal.monthlyGoal / Object.values(monthlyTotals) < 1
                ? 'Hedefe ulaştınız'
                : 'Hedefe Ulaşmaya Az kaldı '}
            </Text>
          </View>

          <View padding-20>
            <Text style={styles.titleText}>HAFTALIK TAKİP GRAFİĞİ</Text>
            <BarChart
              data={data}
              width={Dimensions.get('window').width - 30} // from react-native
              height={220}
              yAxisSuffix="ml"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 10,
                  padding: 10,
                  margin: 10,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              bezier
              style={styles.charStyle}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  goalContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 12,
  },
  goalsContainer: {
    backgroundColor: Colors.grey60,
    padding: 15,
    margin: 12,
    elevation: 1,

    borderRadius: 10,
  },
  titleText: {
    fontWeight: '600',
    fontSize: 18,
  },
  subText: {
    fontSize: 14,
    fontWeight: '500',
  },
  charStyle: {
    marginVertical: 8,
    borderRadius: 1,
    padding: 10,
  },
});
