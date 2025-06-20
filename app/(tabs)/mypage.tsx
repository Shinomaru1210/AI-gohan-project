// app/(tabs)/mypage.tsx

import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { NativeSyntheticEvent, ScrollView, StyleSheet, Switch, Text, TextInput, TextInputSubmitEditingEventData, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Family = {
  id: number;
  name: string;
  menber: number;
};

export default function MypageScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [hasAllergy, setHasAllergy] = useState(false);

  const [FamilyMenber, setMenber] = useState<Family[]>([
  ])

const [setShowInput, setInput] = useState(false);
const [inputText, setInputText] = useState('');
const [showButton, setShowButton] = useState(false);
const [nextId, setNextId] = useState(3); // 初期IDは既存数+1

const setField = () => {
  setInput(true);
}

const pressEnter = (e:NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
  const text = e.nativeEvent.text;
  if (text.trim() === '') return;

  setMenber(prev => [...prev, { id: nextId, name: text, menber: 0 }]);
  setNextId(prev => prev + 1);

  setInputText(''); // 入力欄をクリア
  setShowButton(true);
}

const delate = (id: number) => {
  setMenber(prev => prev.filter(member => member.id !== id));
}

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>マイページ</Text>

        <View style={styles.section}>
          <Ionicons name="person-circle" size={28} color="#2196F3" />
          <Text style={styles.sectionTitle}>ユーザー設定</Text>
          <Text style={styles.itemText}>仮ユーザー: guest@example.com</Text>
        </View>

        <View style={styles.section}>
          <AntDesign name="user" size={24} color="black" />
          <Text style={styles.itemText}>家族構成</Text>
          <Text style={styles.itemText}>家族を追加
          <TouchableOpacity onPress={setField}>
            <Entypo name='circle-with-plus' size={20} color="black" style={styles.itemText}/>
          </TouchableOpacity>
          </Text>
          {setShowInput && (
            <TextInput
              style={styles.itemText}
              value={inputText}
              onChangeText={setInputText}
              placeholder='名前を入力'
              onSubmitEditing={pressEnter}
            />
          )}

          {inputText !== '' && (
            <Text style={styles.itemText}>入力された名前：{inputText}</Text>     
          )}
  
          {FamilyMenber.map((menber) => (
          <View 
            key={menber.id}
            style={{
              flexDirection: 'row'
            }}
          >
            <Text>{menber.name}</Text>

            {showButton && (
              <TouchableOpacity onPress={() => delate(menber.id)}>
                <AntDesign name="minuscircleo" size={20} color="black" style={styles.itemText}/>
              </TouchableOpacity>
            )}
          </View>
          ))}
        </View>

        <View style={styles.section}>
          <Ionicons name="notifications" size={24} color="#FFC107" />
          <View style={styles.row}>
            <Text style={styles.itemText}>通知を受け取る</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Ionicons name="alert-circle" size={24} color="#FF7043" />
          <View style={styles.row}>
            <Text style={styles.itemText}>アレルギー登録</Text>
            <Switch value={hasAllergy} onValueChange={setHasAllergy} />
          </View>
          {hasAllergy && (
            <Text style={styles.subText}>※ 今後アレルギー食材の除外設定に対応予定</Text>
          )}
        </View>

        <View style={styles.section}>
          <Ionicons name="information-circle" size={24} color="#9E9E9E" />
          <Text style={styles.itemText}>バージョン: 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAFAFA' },
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
  section: {
  backgroundColor: '#FFFFFF', padding: 16, borderRadius: 10, marginBottom: 16,
  shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2,
  },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginTop: 8, marginBottom: 4 },
  row: {
  flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8,
  },
  itemText: { fontSize: 16 },
  subText: { fontSize: 13, marginTop: 4, color: '#888' },
  button: {
  backgroundColor: '#2196F3',
  paddingVertical: 10,
  paddingHorizontal: 16,
  marginLeft: 8,
  borderRadius: 6,
  },
});
