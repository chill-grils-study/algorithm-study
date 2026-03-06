public class Main {
    static final int INF = 1_000_000_000;
    static ArrayList<Edge> graph = new ArrayList<>();

    public static void bellmanFord(int n, int m, int start) {

        int[] distances = new int[n + 1];
        Arrays.fill(distances, INF);
        distances[start] = 0;

        for (int i = 1; i < n; i++) {
            for (int j = 0; j < m; j++) {
                Edge edge = graph.get(j);

                if (distances[edge.from] != INF &&
                    distances[edge.to] > distances[edge.from] + edge.cost) {

                    distances[edge.to] = distances[edge.from] + edge.cost;
                }
            }
        }

        for (int j = 0; j < m; j++) {
            Edge edge = graph.get(j);

            if (distances[edge.from] != INF &&
                distances[edge.to] > distances[edge.from] + edge.cost) {

                System.out.println(-1);
                return;
            }
        }

        for (int i = 2; i <= n; i++) {
            if (distances[i] == INF) {
                System.out.println(-1);
            } else {
                System.out.println(distances[i]);
            }
        }
    }

    public static void main(String[] args) throws IOException {
        // -- 입력 처리 --
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        int n = Integer.parseInt(st.nextToken());
        int m = Integer.parseInt(st.nextToken());

        for (int i = 0; i < m; i++) {
            st = new StringTokenizer(br.readLine());

            int from = Integer.parseInt(st.nextToken());
            int to = Integer.parseInt(st.nextToken());
            int cost = Integer.parseInt(st.nextToken());

            graph.add(new Edge(from, to, cost));
        }
        // -- 입력 처리 --

        bellmanFord(n, m, 1);
    }
}