"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BarChart3,
  ArrowLeft,
  CheckCircle2,
  Globe,
} from "lucide-react";
import Navbar from "@/components/Navbar";

const STEPS = [
  {
    title: "Set up the data agent",
    desc: "Initialize your data agent with SQL, pandas, visualization, and LLM integration.",
    code: `mkdir data-agent && cd data-agent\npython -m venv .venv && source .venv/bin/activate\npip install openai pandas sqlalchemy\npip install matplotlib seaborn plotly\npip install "mcp[cli]"  # Model Context Protocol`,
  },
  {
    title: "Build the NL-to-SQL engine",
    desc: "Translate natural language questions into SQL queries against your database schema.",
    code: `# tools/sql_engine.py\nfrom sqlalchemy import create_engine, text\nfrom openai import OpenAI\n\nclass NLToSQLEngine:\n    def __init__(self, connection_string: str):\n        self.engine = create_engine(connection_string)\n        self.llm = OpenAI()\n\n    async def get_schema(self) -> str:\n        with self.engine.connect() as conn:\n            tables = conn.execute(text(\n                "SELECT table_name FROM information_schema.tables"))\n            schema_parts = []\n            for (table,) in tables:\n                cols = conn.execute(text(\n                    f"SELECT column_name, data_type "\n                    f"FROM information_schema.columns "\n                    f"WHERE table_name = '{table}'"))\n                cols_str = "\\n".join(\n                    f"  - {c[0]}: {c[1]}" for c in cols)\n                schema_parts.append(f"Table: {table}\\n{cols_str}")\n            return "\\n\\n".join(schema_parts)\n\n    async def query(self, question: str):\n        schema = await self.get_schema()\n        response = self.llm.chat.completions.create(\n            model="gpt-4o",\n            messages=[{\n                "role": "system",\n                "content": f"Schema:\\n{schema}\\n\\n" +\n                    "Generate a SQL query for this question. " +\n                    "Only return valid SQL, no explanations."\n            }, {\n                "role": "user", "content": question\n            }])\n        sql = response.choices[0].message.content.strip()\n        with self.engine.connect() as conn:\n            result = conn.execute(text(sql))\n            return {"sql": sql, "columns": result.keys(), "rows": [dict(r) for r in result]}`
  },
  {
    title: "Add ETL pipeline generation",
    desc: "Build tools that generate data transformation pipelines based on source and target descriptions.",
    code: `# tools/etl.py\nimport pandas as pd\nfrom typing import Optional\n\nclass ETLPipeline:\n    async def generate_pipeline(\n        self,\n        source_type: str,\n        source_config: dict,\n        transformations: list[str],\n        target_type: str,\n        target_config: dict,\n    ) -> str:\n        steps = []\n\n        # Source extraction\n        if source_type == "postgres":\n            steps.append(f'''def extract():\n    engine = create_engine(\"{source_config['url']}\")\n    query = \"\"\"{source_config.get('query', 'SELECT * FROM table')}\"\"\"\n    return pd.read_sql(query, engine)''')\n\n        # Transformations\n        for i, t in enumerate(transformations):\n            steps.append(f'''def transform_{i}(df):\n    \"\"\"{t}\"\"\"\n    # Generated transformation step\n    return df''')\n\n        # Target loading\n        if target_type == "csv":\n            steps.append(\n                f'df.to_csv(\"{target_config[\"path\"]}\", index=False)')\n        elif target_type == "postgres":\n            steps.append(\n                f'df.to_sql(\"{target_config[\"table\"]}\", engine, if_exists=\"replace\")')\n\n        return "\\n\\n".join(steps)`
  },
  {
    title: "Build visualization tools",
    desc: "Generate charts and dashboards automatically from query results.",
    code: `# tools/viz.py\nimport matplotlib.pyplot as plt\nimport seaborn as sns\nimport pandas as pd\nfrom io import BytesIO\nimport base64\n\nclass VisualizationTool:\n    def __init__(self):\n        sns.set_theme(style="darkgrid")\n        plt.rcParams.update({\n            "figure.facecolor": "#0a0a14",\n            "axes.facecolor": "#0a0a14",\n            "text.color": "white",\n            "axes.labelcolor": "gray",\n        })\n\n    async def create_chart(\n        self, data: list[dict], chart_type: str,\n        x_col: str, y_col: str, title: str = ""\n    ) -> str:\n        df = pd.DataFrame(data)\n        fig, ax = plt.subplots(figsize=(10, 6))\n\n        if chart_type == "bar":\n            sns.barplot(data=df, x=x_col, y=y_col, ax=ax)\n        elif chart_type == "line":\n            sns.lineplot(data=df, x=x_col, y=y_col, ax=ax)\n        elif chart_type == "scatter":\n            sns.scatterplot(data=df, x=x_col, y=y_col, ax=ax)\n        elif chart_type == "heatmap":\n            sns.heatmap(df.corr(), annot=True, ax=ax)\n\n        ax.set_title(title or f"{chart_type} of {y_col} by {x_col}")\n        buf = BytesIO()\n        plt.savefig(buf, format="png", dpi=150, bbox_inches="tight")\n        plt.close()\n        return base64.b64encode(buf.getvalue()).decode()`
  },
  {
    title: "Add anomaly detection",
    desc: "Equip your agent to automatically detect outliers and unusual patterns in data.",
    code: `# tools/anomaly.py\nimport pandas as pd\nimport numpy as np\nfrom scipy import stats\n\nclass AnomalyDetector:\n    def detect_outliers_iqr(self, df: pd.DataFrame, column: str):\n        Q1 = df[column].quantile(0.25)\n        Q3 = df[column].quantile(0.75)\n        IQR = Q3 - Q1\n        lower = Q1 - 1.5 * IQR\n        upper = Q3 + 1.5 * IQR\n        outliers = df[(df[column] < lower) | (df[column] > upper)]\n        return {\n            "method": "IQR",\n            "thresholds": {"lower": lower, "upper": upper},\n            "count": len(outliers),\n            "outliers": outliers.to_dict("records"),\n        }\n\n    def detect_zscore(self, df: pd.DataFrame, column: str, threshold: float = 3):\n        z = np.abs(stats.zscore(df[column].dropna()))\n        outliers = df[z > threshold]\n        return {\n            "method": "Z-Score",\n            "threshold": threshold,\n            "count": len(outliers),\n            "outliers": outliers.to_dict("records"),\n        }`
  },
  {
    title: "Run your agent",
    desc: "Launch the data CLI and start exploring your data with natural language.",
    code: `# main.py\nfrom tools.sql_engine import NLToSQLEngine\nfrom tools.viz import VisualizationTool\nfrom tools.anomaly import AnomalyDetector\nimport asyncio\n\nasync def main():\n    engine = NLToSQLEngine("postgresql://user:pass@localhost/mydb")\n    viz = VisualizationTool()\n    print("📊 Data Agent ready — ask me anything about your data!")\n    while True:\n        question = input("\\n> ")\n        if question.lower() in ("exit", "quit"):\n            break\n        result = await engine.query(question)\n        print(f"\\nSQL: {result['sql']}")\n        print(f"Rows: {len(result['rows'])}")\n        for row in result['rows'][:5]:\n            print(f"  {row}")\n\nasyncio.run(main())`,
  },
];

const TOOLS = [
  { name: "dbt", url: "https://docs.getdbt.com", desc: "Data transformation & analytics engineering" },
  { name: "Apache Spark", url: "https://spark.apache.org", desc: "Distributed processing" },
  { name: "Metabase", url: "https://metabase.com", desc: "Open-source BI & dashboards" },
  { name: "Postgres", url: "https://postgresql.org", desc: "Relational database" },
  { name: "pandas", url: "https://pandas.pydata.org", desc: "Data manipulation" },
  { name: "Plotly", url: "https://plotly.com", desc: "Interactive visualizations" },
  { name: "Apache Superset", url: "https://superset.apache.org", desc: "Data exploration & viz" },
];

export default function DataAgentPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content" className="relative">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.18, 0.08], x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="fixed top-32 left-1/4 w-[600px] h-[600px] bg-blue-500/6 rounded-full blur-[150px] -z-10 pointer-events-none"
        />

        <section className="px-4 sm:px-6 pt-24 pb-20">
          <div className="max-w-4xl mx-auto space-y-10">
            <Link href="/agents/build" className="inline-flex items-center gap-1.5 text-[10px] font-bold text-gray-500 hover:text-white transition-colors">
              <ArrowLeft size={12} />
              Back to Agent Builder
            </Link>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-[10px] font-bold uppercase tracking-wider">
                <BarChart3 size={11} />
                Build Guide
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
                <span className="text-4xl md:text-5xl mr-3">📊</span>
                Data Agent
              </h1>
              <p className="text-gray-500 text-base max-w-2xl leading-relaxed">
                Build an autonomous data analyst that turns natural language into
                SQL queries, generates ETL pipelines, creates visualizations,
                detects anomalies, and produces reports — all from plain English.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "NL to SQL", desc: "Natural language queries" },
                { label: "ETL Pipelines", desc: "Automated data transformations" },
                { label: "Visualizations", desc: "Charts & dashboards" },
                { label: "Anomaly Detection", desc: "IQR, Z-Score, trends" },
              ].map((cap) => (
                <div key={cap.label} className="p-3 rounded-xl glass border border-white/8">
                  <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">{cap.label}</div>
                  <div className="text-[10px] text-gray-500 mt-1">{cap.desc}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h2 className="text-xs font-black uppercase tracking-[0.25em] text-gray-400">Recommended Tools</h2>
              <div className="flex flex-wrap gap-2">
                {TOOLS.slice(0, 7).map((tool) => (
                  <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/8 text-[10px] font-bold text-gray-400 hover:text-white hover:border-white/20 transition-all">
                    <Globe size={10} className="text-blue-400" />
                    {tool.name}
                    <span className="text-gray-600 font-normal">— {tool.desc}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-sm font-black uppercase tracking-[0.25em] text-gray-400">Build Steps</h2>
              {STEPS.map((step, i) => (
                <motion.div key={step.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="relative pl-8">
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
                    <span className="text-[10px] font-black text-blue-400">{i + 1}</span>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-white">{step.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                    <pre className="p-4 rounded-xl bg-[#0a0a14] border border-white/8 overflow-x-auto">
                      <code className="text-[11px] leading-relaxed text-gray-300 font-mono">{step.code}</code>
                    </pre>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-6 rounded-2xl glass border border-white/8 text-center space-y-3">
              <BarChart3 size={24} className="text-blue-400 mx-auto" />
              <p className="text-sm font-bold text-white">Ready to build your Data Agent?</p>
              <p className="text-xs text-gray-500">Connect it to your databases, warehouses, and APIs for autonomous data exploration and analysis.</p>
              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500">
                <CheckCircle2 size={10} className="text-emerald-400" /> Python + SQL
                <span className="text-gray-700">|</span>
                <CheckCircle2 size={10} className="text-emerald-400" /> MCP-compatible
                <span className="text-gray-700">|</span>
                <CheckCircle2 size={10} className="text-emerald-400" /> Auto-visualize
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
