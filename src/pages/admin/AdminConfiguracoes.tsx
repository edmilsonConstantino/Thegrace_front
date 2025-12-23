import { useState } from 'react';
import { 
  Palette,
  Globe,
  Bell,
  Shield,
  Mail,
  Image,
  Save,
  Upload,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function AdminConfiguracoes() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-3xl text-[#263238]">
            Configurações
          </h1>
          <p className="text-gray-500 mt-1">
            Personalize as configurações do portal.
          </p>
        </div>
        <Button className="bg-[#00BFA5] hover:bg-[#00BFA5]/90">
          <Save className="mr-2" size={18} />
          Salvar Alterações
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 w-full max-w-xl">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe size={16} />
            <span className="hidden sm:inline">Geral</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette size={16} />
            <span className="hidden sm:inline">Aparência</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell size={16} />
            <span className="hidden sm:inline">Notificações</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail size={16} />
            <span className="hidden sm:inline">Email</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield size={16} />
            <span className="hidden sm:inline">Segurança</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="font-display text-lg">Informações da Associação</CardTitle>
                <CardDescription>Dados gerais exibidos no portal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="orgName">Nome da Organização</Label>
                  <Input id="orgName" defaultValue="The Graces OAC" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição Curta</Label>
                  <Textarea 
                    id="description" 
                    defaultValue="Uma associação dedicada a transformar vidas através da caridade e ação comunitária."
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Principal</Label>
                    <Input id="email" type="email" defaultValue="info@thegraces.org" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" defaultValue="+351 123 456 789" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input id="address" defaultValue="Rua da Graça, 123 - Lisboa, Portugal" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="font-display text-lg">Redes Sociais</CardTitle>
                <CardDescription>Links para as redes sociais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input id="facebook" placeholder="https://facebook.com/thegracesoac" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input id="instagram" placeholder="https://instagram.com/thegracesoac" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input id="twitter" placeholder="https://twitter.com/thegracesoac" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input id="linkedin" placeholder="https://linkedin.com/company/thegracesoac" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="font-display text-lg">Logo e Favicon</CardTitle>
                <CardDescription>Imagens da marca</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Logo Principal</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#00BFA5] to-[#9C27B0] rounded-xl flex items-center justify-center">
                      <span className="text-white font-display font-bold text-2xl">TG</span>
                    </div>
                    <Button variant="outline">
                      <Upload className="mr-2" size={16} />
                      Alterar Logo
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Favicon</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#00BFA5] to-[#9C27B0] rounded-lg flex items-center justify-center">
                      <span className="text-white font-display font-bold text-sm">TG</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2" size={14} />
                      Alterar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="font-display text-lg">Cores do Tema</CardTitle>
                <CardDescription>Personalização de cores</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Cor Primária</Label>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-[#00BFA5]" />
                      <Input defaultValue="#00BFA5" className="flex-1" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Cor Secundária</Label>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-[#9C27B0]" />
                      <Input defaultValue="#9C27B0" className="flex-1" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Cor de Texto</Label>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-[#263238]" />
                      <Input defaultValue="#263238" className="flex-1" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Cor de Fundo</Label>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-[#FAFAFA] border" />
                      <Input defaultValue="#FAFAFA" className="flex-1" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="mt-6">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="font-display text-lg">Preferências de Notificações</CardTitle>
              <CardDescription>Configure quando e como receber notificações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { title: 'Novos membros', description: 'Receber notificação quando houver nova solicitação de membro' },
                { title: 'Inscrições em eventos', description: 'Receber notificação a cada nova inscrição' },
                { title: 'Mensagens de contato', description: 'Receber notificação para novas mensagens' },
                { title: 'Reclamações', description: 'Receber notificação imediata para reclamações' },
                { title: 'Relatórios semanais', description: 'Receber resumo semanal de atividades' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-[#263238]">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <Switch defaultChecked={index < 4} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="font-display text-lg">Configurações SMTP</CardTitle>
                <CardDescription>Servidor de email para envio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtpHost">Host SMTP</Label>
                    <Input id="smtpHost" placeholder="smtp.example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">Porta</Label>
                    <Input id="smtpPort" placeholder="587" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpUser">Usuário</Label>
                  <Input id="smtpUser" placeholder="user@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPass">Senha</Label>
                  <Input id="smtpPass" type="password" placeholder="••••••••" />
                </div>
                <Button variant="outline" className="w-full">
                  Testar Conexão
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="font-display text-lg">Templates de Email</CardTitle>
                <CardDescription>Personalização de emails automáticos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="template">Selecionar Template</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha um template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="welcome">Boas-vindas</SelectItem>
                      <SelectItem value="event">Confirmação de Evento</SelectItem>
                      <SelectItem value="newsletter">Newsletter</SelectItem>
                      <SelectItem value="password">Recuperação de Senha</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailSubject">Assunto</Label>
                  <Input id="emailSubject" defaultValue="Bem-vindo à The Graces OAC!" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailBody">Corpo do Email</Label>
                  <Textarea 
                    id="emailBody" 
                    rows={6}
                    defaultValue="Olá {nome},

Seja bem-vindo à nossa comunidade! Estamos muito felizes em tê-lo conosco.

Atenciosamente,
Equipe The Graces OAC"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="font-display text-lg">Autenticação</CardTitle>
                <CardDescription>Configurações de segurança de login</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { title: 'Autenticação de dois fatores', description: 'Exigir código adicional no login' },
                  { title: 'Login com Google', description: 'Permitir login via conta Google' },
                  { title: 'Login com Facebook', description: 'Permitir login via conta Facebook' },
                  { title: 'Bloqueio após tentativas', description: 'Bloquear conta após 5 tentativas falhas' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-[#263238]">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                    <Switch defaultChecked={index > 0} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="font-display text-lg">Alterar Senha Admin</CardTitle>
                <CardDescription>Atualização da senha de administrador</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPass">Senha Atual</Label>
                  <Input id="currentPass" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPass">Nova Senha</Label>
                  <Input id="newPass" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPass">Confirmar Nova Senha</Label>
                  <Input id="confirmPass" type="password" placeholder="••••••••" />
                </div>
                <Button className="w-full bg-[#00BFA5] hover:bg-[#00BFA5]/90">
                  Atualizar Senha
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
