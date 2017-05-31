
public class MyHash {
	private final static int TABLE_SIZE = 128;
    private int count = 0;
    HashEntry[] table;

    public MyHash() {
          table = new HashEntry[TABLE_SIZE];
          for (int i = 0; i < TABLE_SIZE; i++)
                table[i] = null;
    }

    public int get(String key) {
          int hash = (Integer.parseInt(key) % TABLE_SIZE);
          while (table[hash] != null && table[hash].getKey() != key)
                hash = (hash + 1) % TABLE_SIZE;
          if (table[hash] == null)
                return -1;
          else
                return table[hash].getValue();
    }

    public void put(String key, int value) {    		  
          int hash = (Integer.parseInt(key) % TABLE_SIZE);
          while (table[hash] != null && table[hash].getKey() != key)
                hash = (hash + 1) % TABLE_SIZE;
          table[hash] = new HashEntry(key, value);
          count++;
    }
}

class HashEntry {
    private String key;
    private int value;

    public HashEntry(String key, int value) {
          this.key = key;
          this.value = value;
    }     

    public String getKey() {
          return key;
    }

    public int getValue() {
          return value;
    }
}
