// ... 다른 코드 유지 ...

{
  /* 메시지 목록 */
}
{
  messages.map((msg, index) => (
    <View key={index}>
      {msg.type !== "user" && <Text style={styles.botName}>아이케어봇</Text>}
      <View style={msg.type === "user" ? styles.greenBox : styles.grayBox}>
        <Text
          style={msg.type === "user" ? styles.whiteText : styles.messageText}
        >
          {msg.text}
        </Text>
      </View>
    </View>
  ));
}

// ... styles에 추가 ...
const styles = StyleSheet.create({
  // ... 기존 스타일 유지 ...

  botName: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    marginLeft: 4
  }
});
