import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { aiTestingQueries, TestResult } from "@/data/aiTestingQueries";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, ExternalLink, Download, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AITesting() {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [selectedQuery, setSelectedQuery] = useState(aiTestingQueries[0]);
  const [currentTest, setCurrentTest] = useState<Partial<TestResult>>({
    queryId: selectedQuery.id,
    date: new Date().toISOString().split('T')[0],
    chatgpt: { cited: false, context: "" },
    claude: { cited: false, context: "" },
    perplexity: { cited: false, context: "" },
    notes: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem("jungleRentAITestResults");
    if (stored) {
      setTestResults(JSON.parse(stored));
    }
  }, []);

  const saveResults = () => {
    const newResults = [...testResults, currentTest as TestResult];
    localStorage.setItem("jungleRentAITestResults", JSON.stringify(newResults));
    setTestResults(newResults);
    
    setCurrentTest({
      queryId: selectedQuery.id,
      date: new Date().toISOString().split('T')[0],
      chatgpt: { cited: false, context: "" },
      claude: { cited: false, context: "" },
      perplexity: { cited: false, context: "" },
      notes: ""
    });

    toast({
      title: "Results saved",
      description: "Test results have been saved to local storage"
    });
  };

  const copyQuery = () => {
    navigator.clipboard.writeText(selectedQuery.query);
    toast({
      title: "Query copied",
      description: "Query has been copied to clipboard"
    });
  };

  const exportResults = () => {
    const csv = [
      ["Date", "Query", "ChatGPT Cited", "Claude Cited", "Perplexity Cited", "Notes"],
      ...testResults.map(r => {
        const query = aiTestingQueries.find(q => q.id === r.queryId);
        return [
          r.date,
          query?.query || "",
          r.chatgpt.cited ? "Yes" : "No",
          r.claude.cited ? "Yes" : "No",
          r.perplexity.cited ? "Yes" : "No",
          r.notes
        ];
      })
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `jungle-rent-ai-testing-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const calculateStats = () => {
    if (testResults.length === 0) return { chatgpt: 0, claude: 0, perplexity: 0, total: 0 };
    
    const chatgptCitations = testResults.filter(r => r.chatgpt.cited).length;
    const claudeCitations = testResults.filter(r => r.claude.cited).length;
    const perplexityCitations = testResults.filter(r => r.perplexity.cited).length;
    
    return {
      chatgpt: Math.round((chatgptCitations / testResults.length) * 100),
      claude: Math.round((claudeCitations / testResults.length) * 100),
      perplexity: Math.round((perplexityCitations / testResults.length) * 100),
      total: Math.round(((chatgptCitations + claudeCitations + perplexityCitations) / (testResults.length * 3)) * 100)
    };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">AI Citation Testing Protocol</h1>
              <p className="text-muted-foreground">
                Weekly testing of 20 target queries across ChatGPT, Claude, and Perplexity
              </p>
            </div>
            <Button onClick={exportResults} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Results
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Overall Citation Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.total}%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {testResults.length} tests completed
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">ChatGPT</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.chatgpt}%</div>
                <p className="text-xs text-muted-foreground mt-1">citation rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Claude</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.claude}%</div>
                <p className="text-xs text-muted-foreground mt-1">citation rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Perplexity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.perplexity}%</div>
                <p className="text-xs text-muted-foreground mt-1">citation rate</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="test" className="space-y-4">
            <TabsList>
              <TabsTrigger value="test">Run Test</TabsTrigger>
              <TabsTrigger value="history">Test History</TabsTrigger>
              <TabsTrigger value="queries">All Queries</TabsTrigger>
            </TabsList>

            {/* Test Tab */}
            <TabsContent value="test" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Query Selection */}
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle>Select Query</CardTitle>
                    <CardDescription>Choose a query to test</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[600px] pr-4">
                      <div className="space-y-2">
                        {aiTestingQueries.map((query) => (
                          <button
                            key={query.id}
                            onClick={() => {
                              setSelectedQuery(query);
                              setCurrentTest({
                                ...currentTest,
                                queryId: query.id
                              });
                            }}
                            className={`w-full text-left p-3 rounded-lg border transition-colors ${
                              selectedQuery.id === query.id
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <Badge variant={
                                query.priority === "high" ? "destructive" :
                                query.priority === "medium" ? "default" : "secondary"
                              }>
                                {query.priority}
                              </Badge>
                              <Badge variant="outline">{query.language}</Badge>
                            </div>
                            <div className="text-sm font-medium mb-1">{query.category}</div>
                            <div className="text-xs text-muted-foreground">{query.query}</div>
                          </button>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Test Interface */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>Test: {selectedQuery.category}</CardTitle>
                        <CardDescription className="mt-2">
                          {selectedQuery.query}
                        </CardDescription>
                      </div>
                      <Button onClick={copyQuery} variant="outline" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Testing Instructions */}
                    <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                      <h4 className="font-semibold text-sm">Testing Instructions:</h4>
                      <ol className="text-sm space-y-2 list-decimal list-inside text-muted-foreground">
                        <li>Copy the query above (click copy button)</li>
                        <li>Open each AI engine in a new tab</li>
                        <li>Paste the query and review responses</li>
                        <li>Record whether Jungle Rent was cited</li>
                        <li>Copy relevant citation context if found</li>
                      </ol>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" asChild>
                          <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            ChatGPT
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <a href="https://claude.ai" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Claude
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <a href="https://perplexity.ai" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Perplexity
                          </a>
                        </Button>
                      </div>
                    </div>

                    {/* Test Date */}
                    <div>
                      <Label>Test Date</Label>
                      <input
                        type="date"
                        value={currentTest.date}
                        onChange={(e) => setCurrentTest({ ...currentTest, date: e.target.value })}
                        className="w-full mt-1 px-3 py-2 border rounded-md"
                      />
                    </div>

                    {/* ChatGPT Results */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-base font-semibold">ChatGPT</Label>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={currentTest.chatgpt?.cited}
                            onCheckedChange={(checked) => 
                              setCurrentTest({
                                ...currentTest,
                                chatgpt: { ...currentTest.chatgpt!, cited: checked as boolean }
                              })
                            }
                          />
                          <Label>Jungle Rent cited</Label>
                        </div>
                      </div>
                      <Textarea
                        placeholder="Paste citation context here (if cited)..."
                        value={currentTest.chatgpt?.context}
                        onChange={(e) => 
                          setCurrentTest({
                            ...currentTest,
                            chatgpt: { ...currentTest.chatgpt!, context: e.target.value }
                          })
                        }
                        rows={3}
                      />
                    </div>

                    {/* Claude Results */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-base font-semibold">Claude</Label>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={currentTest.claude?.cited}
                            onCheckedChange={(checked) => 
                              setCurrentTest({
                                ...currentTest,
                                claude: { ...currentTest.claude!, cited: checked as boolean }
                              })
                            }
                          />
                          <Label>Jungle Rent cited</Label>
                        </div>
                      </div>
                      <Textarea
                        placeholder="Paste citation context here (if cited)..."
                        value={currentTest.claude?.context}
                        onChange={(e) => 
                          setCurrentTest({
                            ...currentTest,
                            claude: { ...currentTest.claude!, context: e.target.value }
                          })
                        }
                        rows={3}
                      />
                    </div>

                    {/* Perplexity Results */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-base font-semibold">Perplexity</Label>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={currentTest.perplexity?.cited}
                            onCheckedChange={(checked) => 
                              setCurrentTest({
                                ...currentTest,
                                perplexity: { ...currentTest.perplexity!, cited: checked as boolean }
                              })
                            }
                          />
                          <Label>Jungle Rent cited</Label>
                        </div>
                      </div>
                      <Textarea
                        placeholder="Paste citation context here (if cited)..."
                        value={currentTest.perplexity?.context}
                        onChange={(e) => 
                          setCurrentTest({
                            ...currentTest,
                            perplexity: { ...currentTest.perplexity!, context: e.target.value }
                          })
                        }
                        rows={3}
                      />
                    </div>

                    {/* Additional Notes */}
                    <div className="space-y-2">
                      <Label>Additional Notes</Label>
                      <Textarea
                        placeholder="Any observations, competitor citations, or other notes..."
                        value={currentTest.notes}
                        onChange={(e) => setCurrentTest({ ...currentTest, notes: e.target.value })}
                        rows={3}
                      />
                    </div>

                    <Button onClick={saveResults} className="w-full" size="lg">
                      Save Test Results
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Test History</CardTitle>
                  <CardDescription>All completed AI citation tests</CardDescription>
                </CardHeader>
                <CardContent>
                  {testResults.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No test results yet. Complete your first test to see results here.</p>
                    </div>
                  ) : (
                    <ScrollArea className="h-[600px]">
                      <div className="space-y-4">
                        {testResults.map((result, index) => {
                          const query = aiTestingQueries.find(q => q.id === result.queryId);
                          return (
                            <div key={index} className="border rounded-lg p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <div className="font-semibold">{query?.query}</div>
                                  <div className="text-sm text-muted-foreground">{result.date}</div>
                                </div>
                                <Badge variant={query?.priority === "high" ? "destructive" : "default"}>
                                  {query?.category}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-3 gap-4 mb-3">
                                <div className={`text-sm ${result.chatgpt.cited ? 'text-green-600 font-semibold' : 'text-muted-foreground'}`}>
                                  ChatGPT: {result.chatgpt.cited ? '✓ Cited' : '✗ Not cited'}
                                </div>
                                <div className={`text-sm ${result.claude.cited ? 'text-green-600 font-semibold' : 'text-muted-foreground'}`}>
                                  Claude: {result.claude.cited ? '✓ Cited' : '✗ Not cited'}
                                </div>
                                <div className={`text-sm ${result.perplexity.cited ? 'text-green-600 font-semibold' : 'text-muted-foreground'}`}>
                                  Perplexity: {result.perplexity.cited ? '✓ Cited' : '✗ Not cited'}
                                </div>
                              </div>
                              {result.notes && (
                                <div className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                                  {result.notes}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* All Queries Tab */}
            <TabsContent value="queries">
              <Card>
                <CardHeader>
                  <CardTitle>All Target Queries (20)</CardTitle>
                  <CardDescription>Complete list of queries to test weekly</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(
                      aiTestingQueries.reduce((acc, query) => {
                        if (!acc[query.category]) acc[query.category] = [];
                        acc[query.category].push(query);
                        return acc;
                      }, {} as Record<string, typeof aiTestingQueries>)
                    ).map(([category, queries]) => (
                      <div key={category}>
                        <h3 className="font-semibold mb-2">{category}</h3>
                        <div className="space-y-2">
                          {queries.map(query => (
                            <div key={query.id} className="border rounded-lg p-3 flex items-start justify-between">
                              <div className="flex-1">
                                <div className="text-sm">{query.query}</div>
                              </div>
                              <div className="flex items-center gap-2 ml-4">
                                <Badge variant="outline">{query.language}</Badge>
                                <Badge variant={
                                  query.priority === "high" ? "destructive" :
                                  query.priority === "medium" ? "default" : "secondary"
                                }>
                                  {query.priority}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
