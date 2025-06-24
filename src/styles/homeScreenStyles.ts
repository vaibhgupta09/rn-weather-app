import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal:20,
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#222',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  darkInput: {
    backgroundColor: '#1e1e1e',
    borderColor: '#444',
    color: '#fff',
  },
  button: {
    backgroundColor: '#3f51b5',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  toggleLabel: {
    fontSize: 16,
    color: '#222',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 30,
  },
  darkCard: {
    backgroundColor: '#1e1e1e',
    shadowColor: '#fff',
  },
  city: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  temp: {
    fontSize: 48,
    fontWeight: '200',
    marginBottom: 8,
    color: '#000',
  },
  condition: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 12,
  },
  icon: {
    width: 100,
    height: 100,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
    fontSize:22
  },
  headingText: {
    color: '#000',
    textAlign: 'center',
    marginBottom: 12,
    fontSize:28,
    fontWeight:'700'
  },
  bodyText: {
    color: '#0f0f0f',
    textAlign: 'center',
    fontSize:14,
  },
  darkText: {
    color: '#fff',
  },
  emptyView:{height:'60%',justifyContent:'center',alignItems:'center'}
});

export default styles;