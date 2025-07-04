
import { useState } from 'react';
import { UserRole } from '@/pages/Index';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Send, Bot, User, FileText, Search, TrendingUp } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: any;
}

interface ChatInterfaceProps {
  userRole: UserRole;
}

export const ChatInterface = ({ userRole }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const demoPrompts = {
    clinician: [
      {
        title: "Fournier's Gangrene Case",
        prompt: "45-year-old male with diabetes presenting with perineal pain, fever, and foul-smelling discharge. What are the diagnostic steps and treatment protocols?",
        icon: FileText
      },
      {
        title: "Emergency Protocol Query",
        prompt: "What are the immediate steps for managing acute appendicitis in a resource-limited setting?",
        icon: TrendingUp
      }
    ],
    researcher: [
      {
        title: "Study Design Analysis",
        prompt: "Provide an overview of existing studies on Fournier's Gangrene in Sub-Saharan Africa, categorized by study design.",
        icon: Search
      },
      {
        title: "Research Gap Identification",
        prompt: "Identify research gaps in surgical outcomes studies from African medical literature.",
        icon: TrendingUp
      }
    ]
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || input;
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateMockResponse(text, userRole),
        timestamp: new Date(),
        metadata: {
          sources: ['AJOL', 'ECAJS', 'AAS'],
          confidence: 0.92
        }
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const generateMockResponse = (query: string, role: UserRole): string => {
    if (role === 'clinician') {
      return `## Clinical Assessment

**Immediate Actions Required:**
1. **Rapid Clinical Evaluation**: The constellation of symptoms (fever, perineal pain, foul-smelling discharge) in a diabetic patient strongly suggests Fournier's gangrene.

2. **Diagnostic Protocol**:
   - Complete blood count and inflammatory markers
   - Blood glucose and HbA1c
   - CT scan of pelvis to assess extent
   - Surgical exploration if high suspicion

**Treatment Protocol**:
- **Immediate**: Broad-spectrum IV antibiotics (Piperacillin-tazobactam + Clindamycin)
- **Urgent**: Surgical debridement within 6 hours
- **Supportive**: ICU care, diabetes management, hyperbaric oxygen if available

**Local Context**: Based on recent AJOL studies from Kenya, early intervention significantly improves outcomes in resource-limited settings.

**Evidence Level**: High (Multiple RCTs and local cohort studies)`;
    } else {
      return 'RESEARCH_TABLE';
    }
  };

  const renderMessageContent = (message: Message) => {
    if (message.role === 'assistant' && message.content === 'RESEARCH_TABLE') {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Research Analysis: Fournier's Gangrene in Sub-Saharan Africa</h2>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Study Distribution by Design:</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Study Type</TableHead>
                  <TableHead className="font-semibold">Count</TableHead>
                  <TableHead className="font-semibold">Key Findings</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Retrospective</TableCell>
                  <TableCell>8</TableCell>
                  <TableCell>Mortality rates 15-30%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Case Reports</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>Rare presentations documented</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Prospective</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>Long-term QoL assessments</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">RCTs</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>Antibiotic comparisons</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Identified Research Gaps:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Limited prospective multicenter studies</li>
              <li>Standardized treatment protocols needed</li>
              <li>Cost-effectiveness analyses lacking</li>
              <li>Quality of life assessments insufficient</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Recommendations:</h3>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Initiate ECAJS-sponsored multicenter trial</li>
              <li>Develop resource-adapted guidelines</li>
              <li>Investigate local antimicrobial resistance patterns</li>
            </ol>
          </div>

          <div>
            <p><strong>Future Research Priorities:</strong> Focus on prevention strategies and early detection protocols suitable for primary healthcare settings.</p>
          </div>
        </div>
      );
    } else if (message.role === 'assistant') {
      return (
        <div dangerouslySetInnerHTML={{ 
          __html: message.content
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        }} />
      );
    } else {
      return <p>{message.content}</p>;
    }
  };

  const currentPrompts = demoPrompts[userRole];

  return (
    <div className="space-y-6">
      {/* Demo Prompts */}
      {messages.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>Try These {userRole === 'clinician' ? 'Clinical' : 'Research'} Queries</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {currentPrompts.map((prompt, index) => {
                const Icon = prompt.icon;
                return (
                  <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleSendMessage(prompt.prompt)}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <Icon className="h-5 w-5 text-gray-600 mt-1" />
                        <div>
                          <h4 className="font-medium text-sm mb-2">{prompt.title}</h4>
                          <p className="text-xs text-gray-600 line-clamp-3">{prompt.prompt}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Chat Messages */}
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-4xl ${message.role === 'user' ? 'ml-12' : 'mr-12'}`}>
              <Card className={`${message.role === 'user' ? 'bg-emerald-500 text-white' : 'bg-white'}`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${message.role === 'user' ? 'bg-emerald-600' : 'bg-gray-100'}`}>
                      {message.role === 'user' ? 
                        <User className="h-4 w-4 text-white" /> : 
                        <Bot className="h-4 w-4 text-gray-600" />
                      }
                    </div>
                    <div className="flex-1">
                      <div className="prose prose-sm max-w-none">
                        {renderMessageContent(message)}
                      </div>
                      {message.metadata && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.metadata.sources.map((source: string, idx: number) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {source}
                            </Badge>
                          ))}
                          <Badge variant="outline" className="text-xs">
                            Confidence: {(message.metadata.confidence * 100).toFixed(0)}%
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-4xl mr-12">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-gray-100">
                      <Bot className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <Card className="sticky bottom-6">
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask a ${userRole} question about African medical evidence...`}
              className="min-h-[60px] resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button 
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isLoading}
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
