'use client';

import {useState, useEffect} from 'react';
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
  const [isVoiceLoading, setIsVoiceLoading] = useState(false); 
  const [receivedRoastsCount, setReceivedRoastsCount] = useState(0);
  const [givenRoastsCount, setGivenRoastsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch('/api/user/profile');
        // if (!response.ok) {
        //   throw new Error('Failed to fetch roast counts');
        // }
        // const data = await response.json(); 
        // setReceivedRoastsCount(data.receivedRoasts); 
        // setGivenRoastsCount(data.givenRoasts); 
        setReceivedRoastsCount(10);
        setGivenRoastsCount(5);
      } catch (error) {
        console.error('Error fetching roast counts:', error);
        toast({ 
          title: 'Error',
          description: 'Failed to load profile stats.',
          variant: 'destructive',
        });
      }
    };
    fetchData();
  }, [toast]); 

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
    console.log("handleVoiceRoast triggered");
    if (!roast) {
      console.log("No roast text available");
      toast({
        title: 'Error',
        description: 'Please generate a roast first.',
        variant: 'destructive',
      });
      return;
    }

    setIsVoiceLoading(true); 
    setVoiceRoast(''); 
    console.log(`Calling generateVoiceRoastWrapper with style: ${voiceStyle}`);

    try {
      const voiceRoastResult = await generateVoiceRoastWrapper({text: roast, voiceStyle: voiceStyle});
      console.log("generateVoiceRoastWrapper returned:", voiceRoastResult);

      if (voiceRoastResult && voiceRoastResult.audio) {
        console.log("Audio base64 received (length:", voiceRoastResult.audio.length, ", first 50 chars):", voiceRoastResult.audio.substring(0, 50) + '...'); 
        setVoiceRoast(voiceRoastResult.audio);
        console.log("voiceRoast state updated");
      } else {
        console.error("Invalid response from generateVoiceRoastWrapper:", voiceRoastResult);
        toast({
          title: 'Error',
          description: 'Failed to generate voice roast. Invalid response received.',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      console.error("Error calling generateVoiceRoastWrapper:", error);
      toast({
        title: 'Error',
        description: `Failed to generate voice roast: ${error.message}`,
        variant: 'destructive',
      });
    } finally {
      setIsVoiceLoading(false); 
      console.log("handleVoiceRoast finished");
    }
  };

  const handleReaction = (reaction: string) => {
    toast({
      title: 'Reaction',
      description: `You reacted with ${reaction}!`,
    });
  };

  // Updated shareRoast function
  const shareRoast = async () => {
    if (!roast) {
      toast({
        title: 'Error',
        description: 'Generate a roast first before sharing.',
        variant: 'destructive',
      });
      return;
    }

    const shareData = {
      title: 'Check out my roast!',
      text: roast,
      url: window.location.href, // Share the current page URL
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast({
          title: 'Shared!',
          description: 'Roast shared successfully using Web Share.',
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(roast);
        toast({
          title: 'Copied!',
          description: 'Roast copied to clipboard.',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Sharing and copying not supported on this browser.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error sharing roast:', error);
      // Avoid showing toast if the user simply cancelled the share action
      if ((error as Error).name !== 'AbortError') {
        toast({
          title: 'Error',
          description: 'Failed to share or copy roast.',
          variant: 'destructive',
        });
      }
    }
  };

 const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleImageUpload triggered");
    const file = event.target.files?.[0];

    if (file) {
      console.log("File selected:", file.name);
      setIsImageLoading(true);
      const reader = new FileReader();

      reader.onload = (e) => {
        console.log("FileReader onload triggered");
        const result = e.target?.result as string;
        console.log("Image loaded as Data URL (first 50 chars):", result ? result.substring(0, 50) + '...' : 'null/undefined'); 
        setSelectedImage(result);
        setIsImageLoading(false);
        form.setValue('image', result);
        console.log("State and form updated");
      };

      reader.onerror = (error) => { 
        console.error("FileReader onerror triggered:", error);
        toast({
          title: 'Error',
          description: 'Failed to read the image.',
          variant: 'destructive',
        });
        setIsImageLoading(false);
      };

      reader.readAsDataURL(file);
      console.log("FileReader readAsDataURL called");
    } else {
      console.log("No file selected or event.target.files is null/empty.");
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
                <AvatarImage src={selectedImage} alt="Uploaded Image" />
              ) : (
                <AvatarImage src="https://picsum.photos/50/50" alt="Profile Image" /> 
              )}
              <AvatarFallback>
                {isImageLoading ? '...' : 'RC'}
              </AvatarFallback>
            </Avatar>
            <div>
              <Input type="file" className="hidden" id="profile-image" onChange={handleImageUpload} accept="image/*"/>
              <label htmlFor="profile-image">
                <Button variant="outline" size="sm" asChild>
                 <span>Upload Photo</span>
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
          <Button onClick={form.handleSubmit(handleRoast)} className="hover:bg-orange-500 hover:text-white">
            Get Roasted! 🔥
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
            {/* The Share button calls the updated shareRoast function */}
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
            <Button onClick={handleVoiceRoast} className="hover:bg-orange-500 hover:text-white" disabled={isVoiceLoading}>
              {isVoiceLoading ? (
                <><icons.loader className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
              ) : (
                'Generate Voice Roast'
              )}
            </Button>
            {isVoiceLoading && <p>Generating voice roast...</p>}
            {!isVoiceLoading && voiceRoast ? (
              <audio controls src={`data:audio/mpeg;base64,${voiceRoast}`}></audio>
            ) : (
              !isVoiceLoading && <p>No voice roast generated yet.</p> 
            )}
          </CardContent>
        </Card>
      )}

      {/* User Profile - Counts driven by state */} 
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>See your received roasts and stats.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Received Roasts: {receivedRoastsCount}</p>
          <p>Given Roasts: {givenRoastsCount}</p>
        </CardContent>
      </Card>
    </div>
  );
}
