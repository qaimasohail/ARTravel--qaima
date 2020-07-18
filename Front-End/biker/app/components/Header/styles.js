import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    flex: 0.5,
    padding: 10,
    backgroundColor: '#393939',
    marginTop: 23,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  header_text: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#FFF',
    marginLeft: 10
  },

  ContainerView: {
    flex: 1,
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 150,
    marginBottom: 30,
    textAlign: 'center',
  },
  loginFormView: {
    flex: 1
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 5,
  
  },
  container: {
    flex: 1,
   },
   sectionHeader: {
    padding:10,
    fontSize: 22,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 24,
    height: 44,
  },
  listText: {
    padding: 10,
    fontSize: 16,
    height: 44,
  },
  loginButton: {
    backgroundColor: '#0D0101',
    borderRadius: 5,
    height: 50,
    margin: 15,
    marginTop: 40,
  },
});