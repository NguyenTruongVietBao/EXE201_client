import {
  Upload,
  Star,
  X,
  Tag,
  FileText,
  File,
  Image,
  Archive,
  DollarSign,
  Percent,
  Video,
  Shield,
  Clock,
  Truck,
  Save,
  ArrowLeft,
} from 'lucide-react';
import React, { useState } from 'react';
import { INTERESTS } from '../../../constants';

export default function CreateDocForm({ onCancel, onSubmit }) {
  const [documentData, setDocumentData] = useState({
    name: '',
    description: '',
    category: '',
    rating: 0,
    tags: [],
    level: '',
    duration: '',
    thumbnailFiles: [],
    documentFiles: [],
    videoFile: null,
    price: '',
    originalPrice: '',
    discount: '',
    license: '',
    previewPages: '',
    deliveryMethod: '',
    returnPolicy: '',
    commission: '',
  });

  const [hoveredStar, setHoveredStar] = useState(0);
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [docDragActive, setDocDragActive] = useState(false);
  const [videoDragActive, setVideoDragActive] = useState(false);

  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const licenses = [
    'Standard License - Personal Use',
    'Extended License - Commercial Use',
    'Educational License - Academic Use',
    'Full Rights - Resale Allowed',
  ];
  const deliveryMethods = [
    'Instant Download',
    'Email Delivery',
    'Cloud Storage Link',
    'Physical Mail',
  ];
  const returnPolicies = [
    '7 Days Money Back',
    '14 Days Money Back',
    '30 Days Money Back',
    'No Refund',
  ];

  const allowedDocTypes = {
    'application/pdf': '.pdf',
    'application/msword': '.doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      '.docx',
    'application/vnd.ms-powerpoint': '.ppt',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      '.pptx',
    'text/plain': '.txt',
    'application/rtf': '.rtf',
    'application/zip': '.zip',
    'application/x-zip-compressed': '.zip',
    'application/x-rar-compressed': '.rar',
    'application/x-7z-compressed': '.7z',
  };

  const allowedVideoTypes = {
    'video/mp4': '.mp4',
    'video/avi': '.avi',
    'video/mov': '.mov',
    'video/wmv': '.wmv',
    'video/webm': '.webm',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Document Data:', documentData);
    // Call parent's onSubmit function if provided
    if (onSubmit) {
      onSubmit(documentData);
    }
  };

  const handleCancel = () => {
    // Reset form data
    setDocumentData({
      name: '',
      description: '',
      category: '',
      rating: 0,
      tags: [],
      level: '',
      duration: '',
      thumbnailFiles: [],
      documentFiles: [],
      videoFile: null,
      price: '',
      originalPrice: '',
      discount: '',
      license: '',
      previewPages: '',

      commission: '',
    });
    setHoveredStar(0);
    setShowTagDropdown(false);

    // Call parent's onCancel function if provided
    if (onCancel) {
      onCancel();
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'number') {
      setDocumentData({
        ...documentData,
        [name]: parseFloat(value) || 0,
      });
    } else {
      setDocumentData({
        ...documentData,
        [name]: value,
      });
    }
  };

  const handleThumbnailUpload = (files) => {
    const validFiles = [];
    const fileArray = Array.from(files);

    fileArray.forEach((file) => {
      if (file && file.type.startsWith('image/')) {
        if (file.size > 5 * 1024 * 1024) {
          alert(`Image ${file.name} is too large. Max size is 5MB`);
          return;
        }
        validFiles.push(file);
      }
    });

    if (validFiles.length > 0) {
      setDocumentData({
        ...documentData,
        thumbnailFiles: [...documentData.thumbnailFiles, ...validFiles],
      });
    }
  };

  const handleDocumentUpload = (files) => {
    const validFiles = [];
    const fileArray = Array.from(files);

    fileArray.forEach((file) => {
      if (
        file &&
        (allowedDocTypes[file.type] ||
          file.name.endsWith('.zip') ||
          file.name.endsWith('.rar') ||
          file.name.endsWith('.7z'))
      ) {
        if (file.size > 100 * 1024 * 1024) {
          alert(`File ${file.name} is too large. Max size is 100MB`);
          return;
        }
        validFiles.push(file);
      } else {
        alert(`${file.name} is not a valid document file`);
      }
    });

    if (validFiles.length > 0) {
      setDocumentData({
        ...documentData,
        documentFiles: [...documentData.documentFiles, ...validFiles],
      });
    }
  };

  const handleVideoUpload = (file) => {
    if (file && allowedVideoTypes[file.type]) {
      if (file.size > 200 * 1024 * 1024) {
        alert('Video file is too large. Max size is 200MB');
        return;
      }
      setDocumentData({
        ...documentData,
        videoFile: file,
      });
    } else {
      alert('Please upload a valid video file (MP4, AVI, MOV, WMV, WEBM)');
    }
  };

  const handleThumbnailDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    handleThumbnailUpload(files);
  };

  const handleDocumentDrop = (e) => {
    e.preventDefault();
    setDocDragActive(false);
    const files = e.dataTransfer.files;
    handleDocumentUpload(files);
  };

  const handleVideoDrop = (e) => {
    e.preventDefault();
    setVideoDragActive(false);
    const file = e.dataTransfer.files[0];
    handleVideoUpload(file);
  };

  const handleThumbnailDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleThumbnailDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDocumentDragOver = (e) => {
    e.preventDefault();
    setDocDragActive(true);
  };

  const handleDocumentDragLeave = (e) => {
    e.preventDefault();
    setDocDragActive(false);
  };

  const handleVideoDragOver = (e) => {
    e.preventDefault();
    setVideoDragActive(true);
  };

  const handleVideoDragLeave = (e) => {
    e.preventDefault();
    setVideoDragActive(false);
  };

  const handleStarClick = (rating) => {
    setDocumentData({ ...documentData, rating });
  };

  const handleTagToggle = (tag) => {
    const isSelected = documentData.tags.includes(tag.name);
    if (isSelected) {
      setDocumentData({
        ...documentData,
        tags: documentData.tags.filter((t) => t !== tag.name),
      });
    } else {
      setDocumentData({
        ...documentData,
        tags: [...documentData.tags, tag.name],
      });
    }
  };

  const removeTag = (tagToRemove) => {
    setDocumentData({
      ...documentData,
      tags: documentData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const removeThumbnail = (indexToRemove) => {
    setDocumentData({
      ...documentData,
      thumbnailFiles: documentData.thumbnailFiles.filter(
        (_, index) => index !== indexToRemove
      ),
    });
  };

  const removeDocument = (indexToRemove) => {
    setDocumentData({
      ...documentData,
      documentFiles: documentData.documentFiles.filter(
        (_, index) => index !== indexToRemove
      ),
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType, fileName) => {
    if (fileType === 'application/pdf') return '📄';
    if (fileType.includes('word')) return '📝';
    if (fileType.includes('presentation')) return '📊';
    if (fileType === 'text/plain') return '📃';
    if (fileType.includes('zip') || fileName.endsWith('.zip')) return '📦';
    if (fileName.endsWith('.rar')) return '📦';
    if (fileName.endsWith('.7z')) return '📦';
    return '📋';
  };

  const calculateSalePrice = () => {
    const original = parseFloat(documentData.originalPrice) || 0;
    const discount = parseFloat(documentData.discount) || 0;
    return original - (original * discount) / 100;
  };

  return (
    <div className='max-w-7xl mx-auto p-6 bg-white rounded-3xl shadow-xl border border-gray-100'>
      {/* Header */}
      <div className='mb-8 pb-6 border-b border-gray-200'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900 flex items-center gap-3'>
              <DollarSign className='w-8 h-8 text-blue-600' />
              Sell Your Document
            </h1>
            <p className='text-gray-600 mt-2 text-lg'>
              Create a premium document listing to earn money
            </p>
          </div>
          {onCancel && (
            <button
              onClick={handleCancel}
              className='flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors duration-200'
            >
              <ArrowLeft className='w-4 h-4' />
              Back
            </button>
          )}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className='space-y-8'>
        {/* Basic Information */}
        <div className='bg-gray-50 rounded-2xl p-6'>
          <h4 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
            <FileText className='w-5 h-5 text-blue-600' />
            Basic Information
          </h4>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {/* Document Name */}
            <div className='lg:col-span-2'>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Document Title *
              </label>
              <input
                type='text'
                name='name'
                value={documentData.name}
                onChange={handleChange}
                placeholder='Enter document title...'
                className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                required
              />
            </div>

            {/* Description */}
            <div className='lg:col-span-2'>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Description *
              </label>
              <textarea
                name='description'
                value={documentData.description}
                onChange={handleChange}
                placeholder='Describe your document in detail...'
                rows={4}
                className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none'
                required
              />
            </div>

            {/* Category & Level */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Category *
              </label>
              <input
                type='text'
                name='category'
                value={documentData.category}
                onChange={handleChange}
                placeholder='e.g., Programming, Math, Science...'
                className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                required
              />
            </div>

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Level *
              </label>
              <select
                name='level'
                value={documentData.level}
                onChange={handleChange}
                className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                required
              >
                <option value=''>Select level</option>
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration & Preview Pages */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Duration
              </label>
              <input
                type='text'
                name='duration'
                value={documentData.duration}
                onChange={handleChange}
                placeholder='e.g., 2 hours, 30 minutes...'
                className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
              />
            </div>

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Preview Pages
              </label>
              <input
                type='text'
                name='previewPages'
                value={documentData.previewPages}
                onChange={handleChange}
                placeholder='e.g., First 5 pages, Table of contents...'
                className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
              />
            </div>

            {/* Rating */}
            <div className='lg:col-span-2'>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Quality Rating
              </label>
              <div className='flex items-center gap-2'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type='button'
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    className='p-1 transition-transform duration-200 hover:scale-110'
                  >
                    <Star
                      className={`w-6 h-6 transition-colors duration-200 ${
                        star <= (hoveredStar || documentData.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
                <span className='text-sm text-gray-600 ml-2'>
                  {documentData.rating > 0
                    ? `${documentData.rating}/5`
                    : 'Not rated'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Information */}
        <div className='bg-blue-50 rounded-2xl p-6'>
          <h4 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
            <DollarSign className='w-5 h-5 text-blue-600' />
            Pricing & Sales
          </h4>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {/* Original Price */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Original Price * ($)
              </label>
              <input
                type='number'
                name='originalPrice'
                value={documentData.originalPrice}
                onChange={handleChange}
                placeholder='99.99'
                step='0.01'
                min='0'
                className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                required
              />
            </div>

            {/* Discount */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1'>
                <Percent className='w-4 h-4' />
                Discount (%)
              </label>
              <input
                type='number'
                name='discount'
                value={documentData.discount}
                onChange={handleChange}
                placeholder='20'
                min='0'
                max='99'
                className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
              />
            </div>

            {/* Sale Price (Calculated) */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Sale Price ($)
              </label>
              <div className='w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-700 font-semibold'>
                {documentData.originalPrice
                  ? `$${calculateSalePrice().toFixed(2)}`
                  : '$0.00'}
              </div>
            </div>

            {/* Commission */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Platform Commission (%)
              </label>
              <select
                name='commission'
                value={documentData.commission}
                onChange={handleChange}
                className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
              >
                <option value=''>Select commission</option>
                <option value='15'>15% - Standard</option>
                <option value='20'>20% - Premium Support</option>
                <option value='25'>25% - Full Marketing</option>
              </select>
            </div>

            {/* License Type */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1'>
                <Shield className='w-4 h-4' />
                License Type
              </label>
              <select
                name='license'
                value={documentData.license}
                onChange={handleChange}
                className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
              >
                <option value=''>Select license</option>
                {licenses.map((license) => (
                  <option key={license} value={license}>
                    {license}
                  </option>
                ))}
              </select>
            </div>

            {/* Delivery Method */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1'>
                <Truck className='w-4 h-4' />
                Delivery Method
              </label>
              <select
                name='deliveryMethod'
                value={documentData.deliveryMethod}
                onChange={handleChange}
                className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
              >
                <option value=''>Select delivery</option>
                {deliveryMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>

            {/* Return Policy */}
            <div className='lg:col-span-3'>
              <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1'>
                <Clock className='w-4 h-4' />
                Return Policy
              </label>
              <select
                name='returnPolicy'
                value={documentData.returnPolicy}
                onChange={handleChange}
                className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
              >
                <option value=''>Select return policy</option>
                {returnPolicies.map((policy) => (
                  <option key={policy} value={policy}>
                    {policy}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Files & Media */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Left Column - Documents & Video */}
          <div className='space-y-6'>
            {/* Document Files Upload */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                <File className='w-4 h-4' />
                Document Files * ({documentData.documentFiles.length} files)
              </label>

              {/* Document File List */}
              {documentData.documentFiles.length > 0 && (
                <div className='mb-4 max-h-32 overflow-y-auto space-y-2'>
                  {documentData.documentFiles.map((file, index) => (
                    <div
                      key={index}
                      className='flex items-center gap-3 p-2 bg-blue-50 rounded-lg border border-blue-200'
                    >
                      <div className='text-lg'>
                        {getFileIcon(file.type, file.name)}
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='font-medium text-gray-900 truncate text-sm'>
                          {file.name}
                        </p>
                        <p className='text-xs text-gray-500'>
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                      <button
                        type='button'
                        onClick={() => removeDocument(index)}
                        className='p-1 hover:bg-red-100 rounded-full transition-colors duration-200'
                      >
                        <X className='w-3 h-3 text-red-500' />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div
                className={`relative border-2 border-dashed rounded-xl transition-all duration-200 ${
                  docDragActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDrop={handleDocumentDrop}
                onDragOver={handleDocumentDragOver}
                onDragLeave={handleDocumentDragLeave}
              >
                <label className='flex flex-col items-center justify-center h-28 cursor-pointer p-4'>
                  <Archive className='w-8 h-8 text-gray-400 mb-2' />
                  <span className='text-sm text-gray-600 mb-1 text-center'>
                    Drop multiple documents here or click to upload
                  </span>
                  <span className='text-xs text-gray-400 text-center'>
                    PDF, DOC, DOCX, PPT, PPTX, TXT, RTF, ZIP, RAR, 7Z (Max 100MB
                    each)
                  </span>
                  <input
                    type='file'
                    accept='.pdf,.doc,.docx,.ppt,.pptx,.txt,.rtf,.zip,.rar,.7z'
                    multiple
                    onChange={(e) => handleDocumentUpload(e.target.files)}
                    className='hidden'
                    required={documentData.documentFiles.length === 0}
                  />
                </label>
              </div>
            </div>

            {/* Video Preview Upload */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                <Video className='w-4 h-4' />
                Preview Video (Optional)
              </label>

              {documentData.videoFile && (
                <div className='mb-4 p-3 bg-purple-50 rounded-lg border border-purple-200'>
                  <div className='flex items-center gap-3'>
                    <Video className='w-8 h-8 text-purple-600' />
                    <div className='flex-1 min-w-0'>
                      <p className='font-medium text-gray-900 truncate'>
                        {documentData.videoFile.name}
                      </p>
                      <p className='text-sm text-gray-500'>
                        {formatFileSize(documentData.videoFile.size)}
                      </p>
                    </div>
                    <button
                      type='button'
                      onClick={() =>
                        setDocumentData({ ...documentData, videoFile: null })
                      }
                      className='p-1 hover:bg-red-100 rounded-full transition-colors duration-200'
                    >
                      <X className='w-4 h-4 text-red-500' />
                    </button>
                  </div>
                </div>
              )}

              <div
                className={`relative border-2 border-dashed rounded-xl transition-all duration-200 ${
                  videoDragActive
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDrop={handleVideoDrop}
                onDragOver={handleVideoDragOver}
                onDragLeave={handleVideoDragLeave}
              >
                <label className='flex flex-col items-center justify-center h-28 cursor-pointer p-4'>
                  <Video className='w-8 h-8 text-gray-400 mb-2' />
                  <span className='text-sm text-gray-600 mb-1 text-center'>
                    Drop video preview here or click to upload
                  </span>
                  <span className='text-xs text-gray-400 text-center'>
                    MP4, AVI, MOV, WMV, WEBM (Max 200MB)
                  </span>
                  <input
                    type='file'
                    accept='video/*'
                    onChange={(e) => handleVideoUpload(e.target.files[0])}
                    className='hidden'
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Images & Tags */}
          <div className='space-y-6'>
            {/* Image Upload */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                <Image className='w-4 h-4' />
                Product Images ({documentData.thumbnailFiles.length} images)
              </label>

              {/* Image Preview Grid */}
              {documentData.thumbnailFiles.length > 0 && (
                <div className='mb-4 grid grid-cols-2 gap-2 max-h-40 overflow-y-auto'>
                  {documentData.thumbnailFiles.map((file, index) => (
                    <div key={index} className='relative group'>
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className='w-full h-20 object-cover rounded-lg'
                      />
                      <button
                        type='button'
                        onClick={() => removeThumbnail(index)}
                        className='absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 opacity-0 group-hover:opacity-100'
                      >
                        <X className='w-3 h-3' />
                      </button>
                      <div className='absolute bottom-1 left-1 px-1 py-0.5 bg-black/50 text-white text-xs rounded'>
                        {formatFileSize(file.size)}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div
                className={`relative border-2 border-dashed rounded-xl transition-all duration-200 ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDrop={handleThumbnailDrop}
                onDragOver={handleThumbnailDragOver}
                onDragLeave={handleThumbnailDragLeave}
              >
                <label className='flex flex-col items-center justify-center h-32 cursor-pointer'>
                  <Upload className='w-8 h-8 text-gray-400 mb-2' />
                  <span className='text-sm text-gray-600 mb-1'>
                    Drop multiple images here or click to upload
                  </span>
                  <span className='text-xs text-gray-400'>
                    PNG, JPG, GIF, WEBP up to 5MB each
                  </span>
                  <input
                    type='file'
                    accept='image/*'
                    multiple
                    onChange={(e) => handleThumbnailUpload(e.target.files)}
                    className='hidden'
                  />
                </label>
              </div>
            </div>

            {/* Tags Selection */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                <Tag className='w-4 h-4' />
                Tags
              </label>

              {/* Selected Tags */}
              {documentData.tags.length > 0 && (
                <div className='flex flex-wrap gap-2 mb-3'>
                  {documentData.tags.map((tag) => (
                    <span
                      key={tag}
                      className='inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm'
                    >
                      {INTERESTS.find((i) => i.name === tag)?.emoji} {tag}
                      <button
                        type='button'
                        onClick={() => removeTag(tag)}
                        className='p-0.5 hover:bg-blue-200 rounded-full transition-colors duration-200'
                      >
                        <X className='w-3 h-3' />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Tag Dropdown */}
              <div className='relative'>
                <button
                  type='button'
                  onClick={() => setShowTagDropdown(!showTagDropdown)}
                  className='w-full px-4 py-3 border border-gray-200 rounded-xl text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 flex items-center justify-between'
                >
                  <span className='text-gray-500'>
                    {documentData.tags.length > 0
                      ? `${documentData.tags.length} tags selected`
                      : 'Select tags...'}
                  </span>
                  <Tag className='w-4 h-4 text-gray-400' />
                </button>

                {showTagDropdown && (
                  <div className='absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto'>
                    {INTERESTS.map((interest) => (
                      <button
                        key={interest.id}
                        type='button'
                        onClick={() => handleTagToggle(interest)}
                        className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2 ${
                          documentData.tags.includes(interest.name)
                            ? 'bg-blue-50 text-blue-700'
                            : ''
                        }`}
                      >
                        <span>{interest.emoji}</span>
                        <span>{interest.name}</span>
                        {documentData.tags.includes(interest.name) && (
                          <span className='ml-auto text-blue-500'>✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Premium Document Badge */}
            <div className='bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4'>
              <div className='flex items-center gap-5'>
                <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center'>
                  <DollarSign className='w-5 h-5 text-white' />
                </div>
                <div>
                  <h4 className='font-semibold text-blue-700'>
                    Premium Document
                  </h4>
                  <p className='text-sm text-blue-600'>
                    Earn money by selling your high-quality documents
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex items-center justify-end gap-4 pt-8 border-t border-gray-200'>
          <button
            type='button'
            onClick={handleCancel}
            className='px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium flex items-center gap-2'
          >
            <X className='w-4 h-4' />
            Cancel
          </button>
          <button
            type='submit'
            className='px-10 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2'
          >
            <Save className='w-4 h-4' />
            Create Document Listing
          </button>
        </div>
      </form>
    </div>
  );
}
