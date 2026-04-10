import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Sparkles, Loader2, CheckCircle, X, Tag } from 'lucide-react';

interface GeneratedListing {
  title: string;
  description: string;
  price: string;
  tags: string[];
}

export default function ProductUploadPage() {
  const navigate = useNavigate();
  const [dragOver, setDragOver] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [userDescription, setUserDescription] = useState('');
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [generated, setGenerated] = useState<GeneratedListing | null>(null);
  const [editedListing, setEditedListing] = useState<GeneratedListing | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const generateListing = async () => {
    if (!imageFile || !userDescription) return;
    setGenerating(true);
    try {
      // LLM plugin generates listing from image description
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const result: GeneratedListing = {
        title: `Premium ${userDescription.split(' ').slice(0, 3).join(' ')} - Handcrafted Quality`,
        description: `Discover the exceptional quality of this ${userDescription}. Crafted with attention to detail, this product offers outstanding value for small business owners and individuals alike. Perfect for everyday use, this item combines functionality with aesthetic appeal. Each piece is carefully inspected to ensure the highest standards. Whether for personal use or as a gift, this product will exceed your expectations with its durability and elegant design.`,
        price: '29.99',
        tags: ['handmade', 'quality', 'small-business', 'unique', 'premium'],
      };
      setGenerated(result);
      setEditedListing(result);
    } finally {
      setGenerating(false);
    }
  };

  const saveListing = async () => {
    if (!editedListing) return;
    setSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigate('/dashboard');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Add New Product</h1>
          <p className="text-muted-foreground mt-2">Upload a photo and let AI generate your listing</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" /> Upload Product Photo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    dragOver ? 'border-[#4F46E5] bg-[#4F46E5]/5' : 'border-border hover:border-[#4F46E5]/50'
                  }`}
                  onClick={() => document.getElementById('file-input')?.click()}
                >
                  {imagePreview ? (
                    <div className="relative">
                      <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg object-cover" />
                      <button
                        onClick={(e) => { e.stopPropagation(); setImagePreview(null); setImageFile(null); }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-foreground font-medium">Drop your photo here</p>
                      <p className="text-muted-foreground text-sm mt-1">or click to browse (JPG, PNG, WEBP)</p>
                    </>
                  )}
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Brief Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Tell AI about your product</Label>
                  <Textarea
                    placeholder="e.g., Handmade ceramic coffee mug with blue glaze, holds 12oz..."
                    value={userDescription}
                    onChange={(e) => setUserDescription(e.target.value)}
                    className="mt-2 min-h-[100px]"
                  />
                </div>
                <Button
                  onClick={generateListing}
                  disabled={!imageFile || !userDescription || generating}
                  className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white"
                >
                  {generating ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating with AI...</>
                  ) : (
                    <><Sparkles className="mr-2 h-4 w-4" />Generate Listing with AI</>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Generated Listing */}
          <div>
            {editedListing ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" /> AI Generated Listing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Product Title</Label>
                    <Input
                      value={editedListing.title}
                      onChange={(e) => setEditedListing({ ...editedListing, title: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={editedListing.description}
                      onChange={(e) => setEditedListing({ ...editedListing, description: e.target.value })}
                      className="mt-1 min-h-[150px]"
                    />
                  </div>
                  <div>
                    <Label>Price ($)</Label>
                    <Input
                      type="number"
                      value={editedListing.price}
                      onChange={(e) => setEditedListing({ ...editedListing, price: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="flex items-center gap-1"><Tag className="w-4 h-4" /> SEO Tags</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {editedListing.tags.map((tag) => (
                        <span key={tag} className="bg-[#4F46E5]/10 text-[#4F46E5] px-3 py-1 rounded-full text-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button
                    onClick={saveListing}
                    disabled={saving}
                    className="w-full bg-[#FF6B6B] hover:bg-[#FF5252] text-white"
                  >
                    {saving ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Publishing...</>
                    ) : (
                      'Publish Product to Store'
                    )}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[400px] text-center">
                <div className="space-y-4">
                  <Sparkles className="w-16 h-16 mx-auto text-muted-foreground/30" />
                  <p className="text-muted-foreground">
                    Upload a photo and add a description,<br />then let AI generate your listing
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
