'use client';

import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {useToast} from '@/hooks/use-toast';
import {generateRoastFromBio} from '@/ai/flows/generate-roast-from-bio';
import {generateVoiceRoastWrapper} from '@/ai/flows/generate-voice-roast';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Label} from '@/components/ui/label';
import {icons} from '@/components/icons';

const voiceStyles = [
  {
    value: 'sarcastic guy',
    label: 'Sarcastic Guy',
  },
  {
    value: 'rude grandma',
    label: 'Rude Grandma',
  },
  {
    value: 'British villain',
    label: 'British Villain',
  },
];

const formSchema = z.object({
  bio: z.string().min(10, {
    message: 'Bio must be at least 10 characters.',
  }),
  image: z.string().optional(),
});

type VoiceStyle = (typeof voiceStyles)[number]['value'];

export default function Home() {
  const [roast, setRoast] = useState('');
  const [voiceRoast, setVoiceRoast] = useState('');
  const {toast} = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [voiceStyle, setVoiceStyle] = useState<VoiceStyle>('sarcastic guy');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bio: '',
      image: '',
    },
  });

  const handleRoast = async (values: z.infer<typeof formSchema>) => {
    if (!values.bio) {
      toast({
        title: 'Error',
        description: 'Please enter a bio to generate a roast.',
        variant: 'destructive',
      });
      return;
    }

    const roastResult = await generateRoastFromBio({bio: values.bio});
    setRoast(roastResult.roast);
  };

  const handleVoiceRoast = async () => {
    if (!roast) {
      toast({
        title: 'Error',
        description: 'Please generate a roast first.',
        variant: 'destructive',
      });
      return;
    }

    const voiceRoastResult = await generateVoiceRoastWrapper({text: roast, voiceStyle: voiceStyle});
    setVoiceRoast(voiceRoastResult.audio);
  };

  const handleReaction = (reaction: string) => {
    toast({
      title: 'Reaction',
      description: `You reacted with ${reaction}!`,
    });
  };

  const shareRoast = () => {
    // Logic for sharing the roast
    toast({
      title: 'Share',
      description: 'Roast shared successfully!',
    });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setIsImageLoading(true);
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setIsImageLoading(false);
        form.setValue('image', e.target?.result as string);
      };

      reader.onerror = () => {
        toast({
          title: 'Error',
          description: 'Failed to read the image.',
          variant: 'destructive',
        });
        setIsImageLoading(false);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-background p-4">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Roast Central</h1>

      {/* Profile Creation */}
      <Card className="w-full max-w-md mb-8">
        <CardHeader>
          <CardTitle>Create Your Profile</CardTitle>
          <CardDescription>Upload a photo or write a bio to get roasted.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              {selectedImage ? (
                <AvatarImage src={selectedImage} alt="Uploaded Image" onLoad={() => setIsImageLoading(false)} />
              ) : (
                <AvatarImage src="https://picsum.photos/50/50" alt="Profile Image" />
              )}
              <AvatarFallback>
                {isImageLoading ? 'Loading...' : 'RC'}
              </AvatarFallback>
            </Avatar>
            <div>
              <Input type="file" className="hidden" id="profile-image" onChange={handleImageUpload} />
              <label htmlFor="profile-image">
                <Button variant="outline" size="sm">
                  Upload Photo
                </Button>
              </label>
            </div>
          </div>
          <div>
            <Textarea
              placeholder="Write your bio here..."
              {...form.register('bio')}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={form.handleSubmit(handleRoast)}>
            Get Roasted! {icons.fire}
          </Button>
        </CardFooter>
      </Card>

      {/* Roast Feed Display */}
      {roast && (
        <Card className="w-full max-w-md mb-8">
          <CardHeader>
            <CardTitle>Your Roast</CardTitle>
            <CardDescription>Here's what we came up with:</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg">{roast}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div>
              <Button variant="ghost" size="sm" onClick={() => handleReaction('😂')}>
                😂
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleReaction('🤬')}>
                🤬
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleReaction('🔥')}>
                🔥
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleReaction('🗑️')}>
                🗑️
              </Button>
            </div>
            <Button variant="outline" size="sm" onClick={shareRoast}>
              Share
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* AI Voice Roasting */}
      {roast && (
        <Card className="w-full max-w-md mb-8">
          <CardHeader>
            <CardTitle>AI Voice Roast</CardTitle>
            <CardDescription>Hear your roast in different voices.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <RadioGroup defaultValue={voiceStyle} onValueChange={setVoiceStyle} className="flex flex-col space-y-1">
              {voiceStyles.map(style => (
                <div key={style.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={style.value} id={style.value} />
                  <Label htmlFor={style.value}>{style.label}</Label>
                </div>
              ))}
            </RadioGroup>
            <Button onClick={handleVoiceRoast}>Generate Voice Roast</Button>
            {voiceRoast ? (
              <audio controls src={`data:audio/mp3;base64,${voiceRoast}`}></audio>
            ) : (
              <p>No voice roast generated yet.</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* User Profile (Simplified) */}
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>See your received roasts and stats.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Received Roasts: 0</p>
          <p>Given Roasts: 0</p>
        </CardContent>
      </Card>
    </div>
  );
}
